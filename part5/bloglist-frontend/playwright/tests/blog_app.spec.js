const { test, expect, beforeEach, describe } = require('@playwright/test')
const { before } = require('node:test')
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      },
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'mluukkai2',
        name: 'Matti fake',
        password: 'salainen',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('suceeded with correct credential', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')

      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()
    })

    test('fails with wrong credential', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrongpassadsfasd')

      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Wrong credential')).toBeVisible()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credential')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(errorDiv).not.toContainText('Matti Luukkainen logged in')
    })
  })

  describe('When logged in ', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('Testing with playwright')
      await page.getByTestId('author').fill('Luukkai')
      await page.getByTestId('url').fill('fullstackopen.com')

      await page.getByRole('button', { name: 'Create' }).click()
      const notiDiv = page.locator('.newBlogAdded')
      await expect(notiDiv).toContainText('Testing with playwright')
      await expect(notiDiv).toContainText('Luukkai')
    })
    describe('several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        })
        await createBlog(page, {
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        })
      })

      test('user can like blog', async ({ page }) => {
        const liked = await page.getByText(
          'Go To Statement Considered Harmful Edsger W. Dijkstra'
        )

        await liked.getByRole('button', { name: 'view' }).click()
        await liked.getByRole('button', { name: 'like' }).click()

        await expect(liked).toContainText('likes 1')
      })

      test.only('blog creator can also delete the Blog', async ({ page }) => {
        const blogToErase = await page.getByText(
          'Go To Statement Considered Harmful Edsger W. Dijkstra'
        )
        await blogToErase.getByRole('button', { name: 'view' }).click()
        page.on('dialog', async (dialog) => await dialog.accept())
        await blogToErase.getByRole('button', { name: 'remove' }).click()

        await expect(blogToErase).toBeHidden()
      })

      describe('user allow to remove heir blog only', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'logout' }).click()
          await loginWith(page, 'mluukkai2', 'salainen')
          // await createBlog(page, {
          //   title: 'This shit always give 500',
          //   author: 'Kanye East',
          //   url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          // })
        })

        test.only('cant find the remove button on others blog', async ({
          page,
        }) => {
          const othersBlog = await page.getByText(
            'Go To Statement Considered Harmful Edsger W. Dijkstra'
          )
          await expect(
            othersBlog.getByRole('button', { name: 'remove' })
          ).toHaveCount(0)
        })
      })
    })
  })
})
