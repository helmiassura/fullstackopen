import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'NEW_BLOG':
      return [...state, action.data].sort((a, b) => b.likes - a.likes)
    case 'LIKE_BLOG':
      return state
        .map(blog => blog.id !== action.data.id ? blog : action.data)
        .sort((a, b) => b.likes - a.likes)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'ADD_COMMENT':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: updatedBlog
    })
  }
}

export default blogReducer