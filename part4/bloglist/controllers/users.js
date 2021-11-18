const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.username && !body.password) {
        return response.status(400).json({ error: 'username and password missing' })
    }
    if (body.username.length < 3) {
        return response.status(400).json({ error: 'username must be at least 3 characters long' })
    }
    if (body.password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        password: passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users.map(u => u.toJSON()))
})


module.exports = userRouter