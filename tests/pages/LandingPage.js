const { expect } = require('@playwright/test');

export class LandingPage {

    constructor(page){
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/')
    }

    async openLeadModal() {
        /*
        await page.click('//button[text()="Aperte o play... se tiver coragem"]')
        await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()
        Usando o /nome/ você consegue buscar por parte do texto e não o texto completo.
        */
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()
        //checkpoint
        expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {
        /*
        await page.locator('#name').fill('zombie-mail@gmail.com')
        await page.locator('input[name=name]').fill('zombie-mail@gmail.com')
        await page.locator('input[placeholder="Seu nome completo"]').fill('zombie-mail@gmail.com')
        */
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)
        //await page.getByText('Quero entrar na fila!').click()
        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click()
    }

    /*
    async toastHaveText(message) {

        const toast = this.page.locator('.toast')
        
        Localizar codigo html de um pop-up rápido (aviso)
        await page.getByText('seus dados conosco').click
        const content = await page.content()
        console.log(content)
        
        await expect(toast).toHaveText(message)
        //await expect(toast).toBeHidden({ timeout: 5500 })
        await expect(toast).not.toBeVisible({ timeout: 5500 })
    }
    */

    async alertHaveText(target) {

        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}