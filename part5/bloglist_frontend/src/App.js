import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setMessage('Wrong credentials')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
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
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
            <Footer />
        </div>
    )
}

export default App
