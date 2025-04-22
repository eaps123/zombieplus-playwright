import { th } from '@faker-js/faker'

const { expect } = require('@playwright/test')


export class Series {

    constructor(page) {
        this.page = page
    }
    
    
    async goForm(){
        await this.page.locator('a[href$="register"]').click()
    }

    async submit(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async create(serie) {
        await this.goForm()
        //utilizando o href$ ele busca a ultima palavra do link, e utilizando * ele busca como "contem" e utilizando o ^ ele busca pelo começo do link.
        //await this.page.locator('#title').fill(title)
        await this.page.getByLabel('Titulo da série').fill(serie.title)
        await this.page.getByLabel('Sinopse').fill(serie.overview)
        /*const html = await this.page.content()
       console.log(html)
       Forma de localizar uma lista em que não é possível inspecionar*/
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: serie.company }).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: serie.release_year }).click()
        await this.page.getByLabel('Temporadas').fill(`${serie.seasons}`)
        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + serie.cover)
            //if que decide se a featured está true ele clica do contrário não entra no if
        if (serie.featured){
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
    }

    async search(target){
        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.click('.actions button')
    }

    async tableHave(content){
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title){
        await this.page.getByRole('row', {name: title}).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }
}