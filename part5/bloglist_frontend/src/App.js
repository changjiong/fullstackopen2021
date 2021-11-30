import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newBlog, setNewBlog] = useState('')
    const [notification, setNotification] = useState(null)

    const notifyWith = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            notifyWith('Wrong credentials', 'error')
        }
    }

    const handleLogout = () => {
        setUser(null)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        console.log('user', user)
        const blogObject = { ...newBlog, user: user.id }
        console.log('blogObject', blogObject)
        try {
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnedBlog))
            setNewBlog('')
            notifyWith(
                `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
            )
        } catch (exception) {
            console.log(exception)
        }
    }

    const blogForm = () => (
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                    type='text'
                    value={newBlog.title}
                    name='Title'
                    onChange={({ target }) =>
                        setNewBlog({ ...newBlog, title: target.value })
                    }
                />
            </div>
            <div>
                content
                <input
                    type='text'
                    value={newBlog.content}
                    name='Content'
                    onChange={({ target }) =>
                        setNewBlog({ ...newBlog, content: target.value })
                    }
                />
            </div>
            <div>
                url
                <input
                    type='text'
                    value={newBlog.url}
                    name='Url'
                    onChange={({ target }) =>
                        setNewBlog({ ...newBlog, url: target.value })
                    }
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification notification={notification} />
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type='text'
                            value={username}
                            name='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type='password'
                            value={password}
                            name='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit'>login</button>
                </form>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <p>
                {user.name} logged in{' '}
                <button onClick={handleLogout}>logout</button>
            </p>
            {blogForm()}

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
            <Footer />
        </div>
    )
}

export default App
