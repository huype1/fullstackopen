const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)

  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title').fill(content.title)
  await page.getByTestId('author').fill(content.author)
  await page.getByTestId('url').fill(content.url)

  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(`${content.title} ${content.author}`).waitFor()
}

export { loginWith, createBlog }
