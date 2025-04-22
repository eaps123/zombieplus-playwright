const { test, expect } = require('../support')

const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require('../support/database')
const { password } = require('pg/lib/defaults')
const { json } = require('stream/consumers')

test.beforeAll(async () => {
    // Acessa o banco e deleta os dados de movies, ajuda no caso de ter problemas de multiplos acessos ao banco
    await executeSQL('DELETE from tvshows')
})

test('deve poder cadastrar uma nova serie', async ({ page }) => {
    const serie = data.create
    // Acessa o banco de dados e delete o filme com o titulo da variavel movie.title
    //await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`)
    await page.login.doSerie('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.create(serie)
    await page.popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`)
})

test('deve poder remover uma serie', async ({ page, request }) => {
    const serie = data.to_remove
    await request.api.postSerie(serie)
    await page.login.doSerie('admin@zombieplus.com', 'pwd123', 'Admin')
    //td[text()="A Noite dos Mortos-Vivos"]/..//button
    //await page.click('.request-removal')
    await page.series.remove(serie.title)
    await page.popup.haveText('Série removida com sucesso.')
})

test('Não deve cadastrar quando a serie é duplicada', async ({ page, request }) => {
    const serie = data.duplicate

    await request.api.postSerie(serie)

    await page.login.doSerie('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.create(serie)
    await page.popup.haveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.doSerie('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.goForm()
    await page.series.submit()
    await page.series.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ])
})

test('deve realizar busca pelo termo zombie', async ({ page, request }) => {
    const series = data.search

    series.data.forEach(async (s) => {
        await request.api.postSerie(s)
    })
    await page.login.doSerie('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.search(series.input)
    await page.series.tableHave(series.outputs)
})