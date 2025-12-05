const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Create a test user
    const passwordHash = await helper.hashPassword('sekret')
    const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
    await user.save()

    // Create blogs with user
    const blogObjects = helper.initialBlogs.map(blog => new Blog({
        ...blog,
        user: user._id
    }))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    // Update user's blogs
    const blogs = await Blog.find({})
    user.blogs = blogs.map(b => b._id)
    await user.save()
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('the unique identifier property is named id', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        blogs.forEach(blog => {
            assert.ok(blog.id)
            assert.strictEqual(blog._id, undefined)
        })
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added with valid token', async () => {
        const token = await helper.getTokenForUser('testuser')

        const newBlog = {
            title: 'Test Blog Post',
            author: 'Test Author',
            url: 'https://testblog.com',
            likes: 10
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        assert.ok(titles.includes('Test Blog Post'))
    })

    test('adding a blog fails with status 401 if token is not provided', async () => {
        const newBlog = {
            title: 'Test Blog Post',
            author: 'Test Author',
            url: 'https://testblog.com',
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('if likes property is missing, it defaults to 0', async () => {
        const token = await helper.getTokenForUser('testuser')

        const newBlog = {
            title: 'Blog without likes',
            author: 'Test Author',
            url: 'https://testblog.com'
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('blog without title is not added', async () => {
        const token = await helper.getTokenForUser('testuser')

        const newBlog = {
            author: 'Test Author',
            url: 'https://testblog.com'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
        const token = await helper.getTokenForUser('testuser')

        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid and user is creator', async () => {
        const token = await helper.getTokenForUser('testuser')
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(b => b.title)
        assert.ok(!titles.includes(blogToDelete.title))
    })

    test('fails with status code 401 if token is not provided', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

describe('updating a blog', () => {
    test('succeeds with valid data', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedData = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes + 1
        }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedData)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })
    test('likes can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updatedData = {
            ...blogToUpdate,
            likes: 999
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedData)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

        assert.strictEqual(updatedBlog.likes, 999)
    })
})
after(async () => {
    await mongoose.connection.close()
})