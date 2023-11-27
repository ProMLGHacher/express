import postgres from 'postgres'
import express, { json } from 'express'

const sql = postgres({
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    db: 'test'
})

const app = express()
app.use(json())
const port = 3001

app.get('/', async (req, res) => {
    res.send("Салам")
})

app.get('/films', async (req, res) => {
    const films = await sql`select * from Films`
    res.send(films)
})

app.post('/film', async (req, res) => {
    const { name, description } = req.body
    const film = await sql`insert into Films(name, description) values(${name}, ${description})`
    res.send(200)
})

const start = async () => {
    await sql`CREATE TABLE IF NOT EXISTS Films(
        id SERIAL NOT NULL PRIMARY KEY,
        name varchar(100) NOT NULL,
        description varchar(300) NOT NULL
    )`
    app.listen(port, () => {
        console.log(`Сервак включен на порту ${port}\nхавай ссылку http://localhost:${port}/`)
    })
}

start()