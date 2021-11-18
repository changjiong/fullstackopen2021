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

test('adding a new blog', async () => {

    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'www.test.com',
        likes: 7
    }

    const token = await helper.getToken()
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('Test blog')
})

test('blog without token is not added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'www.test.com',
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
}, 200000)


test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = await blogsAtStart.find(blog => blog.title === 'Type wars')

    const token = await helper.getToken()

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.content)

    expect(contents).not.toContain(blogToDelete.content)
}, 200000)


afterAll(() => {
    mongoose.connection.close()
})