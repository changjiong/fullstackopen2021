import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
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
        console.log('make', notes)
        const note = notes.find((note) => note.id === id)
        console.log('note', note)
        const changedNote = { ...note, important: !note.important }
        console.log('changedNote', changedNote)
        noteService
            .update(id, changedNote)
            .then((response) => {
                setNotes(
                    notes.map((note) => (note.id !== id ? note : response.data))
                )
                console.log('respinsedata', response.data)
                console.log('newNotes', notes)
            })
            .catch((error) => {
                console.log(error)
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

    const handleUsernameChange = (event) => {
        console.log('username', event.target.value)
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        console.log('password', event.target.value)
        setPassword(event.target.value)
    }

    const loginForm = () => (
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
    )

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} />
            <button type='submit'>save</button>
        </form>
    )

    return (
        <div>
            <h1>Notes</h1>

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
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

export default App
