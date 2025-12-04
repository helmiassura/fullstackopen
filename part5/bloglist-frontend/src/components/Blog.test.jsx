import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, test, expect, vi } from 'vitest'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'https://testing.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const currentUser = {
    username: 'testuser',
    name: 'Test User'
  }

  test('renders title and author, but not URL or likes by default', () => {
    render(
      <Blog 
        blog={blog} 
        handleLike={() => {}} 
        handleDelete={() => {}} 
        currentUser={currentUser} 
      />
    )

    const titleAuthor = screen.getByText('Component testing is done with react-testing-library Test Author')
    expect(titleAuthor).toBeDefined()

    const url = screen.queryByText('https://testing.com')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes 5')
    expect(likes).toBeNull()
  })

  test('URL and likes are shown when the view button is clicked', async () => {
    render(
      <Blog 
        blog={blog} 
        handleLike={() => {}} 
        handleDelete={() => {}} 
        currentUser={currentUser} 
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('https://testing.com')
    expect(url).toBeDefined()

    const likes = screen.getByText('likes 5', { exact: false })
    expect(likes).toBeDefined()
  })

  test('if like button is clicked twice, event handler is called twice', async () => {
    const mockHandler = vi.fn()

    render(
      <Blog 
        blog={blog} 
        handleLike={mockHandler} 
        handleDelete={() => {}} 
        currentUser={currentUser} 
      />
    )

    const user = userEvent.setup()
    
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})