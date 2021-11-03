import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}， you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'React'
  const age = 10
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="john" age={26+10}/>
      <Hello name="daisy" age={age}/>
    </>
  )
}

export default App