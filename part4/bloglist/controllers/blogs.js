const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)

})


blogsRouter.post('/', async (request, response) => {
    if (!request.body.likes) {
        request.body.likes = 0
    }

    if (!request.body.title || !request.body.url) {
        return response.status(400).json({ error: 'title and url are required' })
    }

    const userId = request.user
    if (!userId) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(userId)
    if (!user) {
        return response.status(400).json({ error: 'user not found' })
    }

    const blog = new Blog({
        title: request.body.title,
        content: request.body.content,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {

    const userId = request.user

    if (!userId) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!request.params.id) {
        return response.status(400).json({ error: 'id missing' })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(400).json({ error: 'blog not found' })
    }
    if (blog.user.toString() !== userId) {
        return response.status(401).json({ error: 'not authorized' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const blog = request.body

    const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(updateBlog)
})


module.exports = blogsRouter
