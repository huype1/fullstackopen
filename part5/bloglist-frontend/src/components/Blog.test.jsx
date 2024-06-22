import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
describe('Testing in blog render', () => {
  const blog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 26,
  }

  test('first only render the Blog Title and Author', () => {
    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('First class tests Robert C. Martin')
  })

  test('Hide url and likes at first', () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.showOnClick')
    const text = container.querySelector('.blog')

    expect(div).toHaveStyle('display: none')

  })

  test('After clicking the view, likes and url are display', async () => {
    const mockLikeHandler = vi.fn()
    const component = render(<Blog blog={blog} updateBlog={mockLikeHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(component.container).toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll')
    expect(component.container).toHaveTextContent('26')
  })

  test('When click like button twice, the event handler component is called twice', async() => {
    const mockLikeHandler = vi.fn()
    const component = render(<Blog blog={blog} updateBlog={mockLikeHandler} />)
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)

    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
})


})
