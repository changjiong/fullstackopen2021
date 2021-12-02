import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        noteService
            .getAll()
            .then((response) => {
                setNotes(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }
        noteService
            .create(noteObject)
            .then((response) => {
                setNotes(notes.concat(response.data))
                setNewNote('')
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleNoteChange = (event) => {
        console.log('new note', event.target.value)
        setNewNote(event.target.value)
    }

    const toggleImportance = (id) => {
        const note = notes.find((note) => note.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then((response) => {
                setNotes(
                    notes.map((note) => (note.id !== id ? note : response.data))
                )
            })
            .catch((error) => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>
                        log in
                    </button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                        handleSubmit={handleLogin}
                    />
                    <button onClick={() => setLoginVisible(false)}>
                        cancel
                    </button>
                </div>
            </div>
        )
    }

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} />
            <button type='submit'>save</button>
        </form>
    )

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.name} logged-in</p>
                    {noteForm()}
                </div>
            )}

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportance(note.id)}
                    />
                ))}
            </ul>

            <Footer />
        </div>
    )
}

export default App
