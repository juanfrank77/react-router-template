import { test, expect } from '@playwright/test'

test('Hello World should be rendered', async ({ page }) => {
    await page.goto('/')

    const hello = page.getByRole('heading', { name: 'Hello World!' })
    await expect(hello).toBeVisible({ timeout: 500 })
})

test('404 page displayed on non-existing routes', async ({ page }) => {
    await page.goto('/pricing')

    const errorPage = page.getByRole('heading', { name: '404 Not Found' })
    await expect(errorPage).toBeVisible({ timeout: 500 })
})