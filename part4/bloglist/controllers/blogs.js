const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
    if (!request.body.likes) {
        request.body.likes = 0
    }

    if (!request.body.title || !request.body.url) {
        return response.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
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
