import { th } from '@faker-js/faker'

const { expect } = require('@playwright/test')


export class MoviesPage {

    constructor(page) {
        this.page = page
    }
    async isLoggedIn() {
        /*const logoutLink = this.page.locator('a[href="/logout"]')
        await expect(logoutLink).toBeVisible()*/
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create(title, overview, company, release_year) {
        //utilizando o href$ ele busca a ultima palavra do link, e utilizando * ele busca como "contem" e utilizando o ^ ele busca pelo começo do link.
        await this.page.locator('a[href$="register"]').click()
        //await this.page.locator('#title').fill(title)
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)
        /*const html = await this.page.content()
       console.log(html)
       Forma de localizar uma lista em que não é possível inspecionar*/

        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: company }).click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()

    }
}