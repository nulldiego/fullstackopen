import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const Anecdote = ( {anecdote, points} ) => (
    <div>
        <p>{anecdote}</p>
        <p>Has {points} votes.</p>
    </div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(10+1).join('0').split('').map(parseFloat))
    const [max, setMax] = useState(0)

    const handleVote = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
        setMax(copy.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0))
    }

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                <Anecdote anecdote={props.anecdotes[selected]} points={points[selected]} />
                <Button onClick={() => handleVote()} text="vote" />
                <Button onClick={() => setSelected(Math.random() * 6 << 0)} text="next anecdote" />
            </div>
            <div>
                <h1>Anecdote with most votes</h1>
                <Anecdote anecdote={props.anecdotes[max]} points={points[max]} />
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)