import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { createContainer } from 'unstated-next'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const useCounter = (initialState = 0) => {
  let [count, setCount] = useState(initialState)
  let decrement = () => {
    setCount(count - 1)
  }
  let increment = () => {
    setCount(count + 1)
  }
  return { count, decrement, increment }
}

let Counter = createContainer(useCounter)

const CounterDisplay = () => {
  let counter = Counter.useContainer()
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
    </div>
  )
}

const counterPage = () => {
  return <CounterDisplay />
}

function Index() {
  return (
    <>
      <h2>Home</h2>
      <CounterDisplay />
    </>
  )
}

function About() {
  return (
    <>
      <h2>About</h2>
      <CounterDisplay />
    </>
  )
}

function Users() {
  return <h2>Users</h2>
}

const GlobalState: React.FC = ({ children }) => {
  return <Counter.Provider>{children}</Counter.Provider>
}

const App: React.FC = () => {
  return (
    <GlobalState>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
              <li>
                <Link to="/counter/">Counter</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Counter.Provider>
            <Route path="/about/" component={About} />
          </Counter.Provider>
          <Route path="/users/" component={Users} />
          <Route path="/counter/" component={counterPage} />

          <div>
            <CounterDisplay />
          </div>
        </div>
      </Router>
    </GlobalState>
  )
}

export default App
