import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm /> update parents state and submit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlogForm createBlog={createBlog} />)
  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('Create')

  await user.type(title, 'testing a form...')
  await user.type(author, 'Travis Scott')
  await user.type(url, 'travisscott.com')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('Travis Scott')
  expect(createBlog.mock.calls[0][0].url).toBe('travisscott.com')
})
