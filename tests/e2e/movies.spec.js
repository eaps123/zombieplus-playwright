const { test } = require('../support')

const data = require('../support/fixtures/movies.json')
const { log } = require('console')
const { title } = require('process')
const { executeSQL } = require('../support/database')

test('deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create
    // Acessa o banco de dados e delete o filme com o titulo da variavel movie.title
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}';`);

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.containText('UhullCadastro realizado com sucesso!')
})