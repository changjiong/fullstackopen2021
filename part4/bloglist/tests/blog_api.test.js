const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 60000)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 10000)

test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
}, 10000)


test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].content).toBe('HTML is easy')
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
})
test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.content)

    expect(contents).not.toContain(blogToDelete.content)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Lsnn wonderful',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 200,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
        'Lsnn wonderful'
    )
})

test('blog without like is set to 0', async () => {
    const newBlog = {
        'title': 'My seventh blog',
        'author': 'lsnn',
        'url': 'http://debian:3001/api/blogs'

    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(0)
},60000)

test('blog without title or url is not added', async () => {
    const newBlog = {
        'author': 'lsnn',
        'url': 'http://debian:3001/api/blogs'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
},60000)


afterAll(() => {
    mongoose.connection.close()
})