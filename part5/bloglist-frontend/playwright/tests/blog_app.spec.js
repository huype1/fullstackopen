const { test, expect, beforeEach, describe } = require('@playwright/test')
const { before } = require('node:test')
import { loginWith } from './helper'

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
    })

    test('fails with wrong credential', async ({ page }) => {
      await page.getByTestId('username').fill('mluuk')
      await page.getByTestId('password').fill('wrongpass')

      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Wrong credential')).toBeVisible()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credential')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(errorDiv).not.toBeVisible('Matti Luukkainen logged in')
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

      await expect(page.getByText('Testing with playwright')).toBeVisible()
      await expect(page.getByText('Luukkai')).toBeVisible()
    })
  })
})
