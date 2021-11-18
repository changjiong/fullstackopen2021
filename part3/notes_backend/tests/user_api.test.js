const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    }, 60000)

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    }, 10000)


    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    },60000)


    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')

        expect(response.body.length).toBe(helper.initialUsers.length)
    })

    test('a specific user is within the returned users', async () => {
        const response = await api.get('/api/users')

        const contents = response.body.map(r => r.content)
        expect(contents).toContain(
            'Browser can execute only Javascript'
        )
    })

    describe('viewing a specific user', () => {

        test('succeeds with a valid id', async () => {
            const usersAtStart = await helper.usersInDb()

            const userToView = usersAtStart[0]

            const resultUser = await api
                .get(`/api/users/${userToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(resultUser.body).toEqual(userToView)
        })

        test('fails with statuscode 404 if user does not exist', async () => {
            const validNonexistingId = await helper.nonExistingId()

            console.log(validNonexistingId)

            await api
                .get(`/api/users/${validNonexistingId}`)
                .expect(404)
        })

        test('fails with statuscode 400 id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api
                .get(`/api/users/${invalidId}`)
                .expect(400)
        })
    })

    describe('addition of a new user', () => {
        test('succeeds with valid data', async () => {
            const newUser = {
                content: 'async/await simplifies making async calls',
                important: true,
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)


            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)

            const contents = usersAtEnd.map(n => n.content)
            expect(contents).toContain(
                'async/await simplifies making async calls'
            )
        })

        test('fails with status code 400 if data invalid', async () => {
            const newUser = {
                important: true
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)

            const usersAtEnd = await helper.usersInDb()

            expect(usersAtEnd.length).toBe(helper.initialUsers.length)
        })
    })

    describe('deletion of a user', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const usersAtStart = await helper.usersInDb()
            const userToDelete = usersAtStart[0]

            await api
                .delete(`/api/users/${userToDelete.id}`)
                .expect(204)

            const usersAtEnd = await helper.usersInDb()

            expect(usersAtEnd.length).toBe(
                helper.initialUsers.length - 1
            )

            const contents = usersAtEnd.map(r => r.content)

            expect(contents).not.toContain(userToDelete.content)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})