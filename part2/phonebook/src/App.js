import React, { useState } from 'react'

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with: <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, valueName, valueNumber, onChangeName, onChangeNumber }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={valueName} onChange={onChangeName} />
    </div>
    <div>
      number: <input value={valueNumber} onChange={onChangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ name, number }) => (
  <div key={name}>
    {name} {number}
  </div>
)

const Persons = ({ persons }) => (
  persons.map(person =>
    <Person name={person.name} number={person.number} />
  )
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  const personsToShow = persons.filter(person => person.name.toUpperCase().includes(searchFilter.toUpperCase()))

  const addContact = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchFilter} onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addContact} valueName={newName} valueNumber={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />

    </div>
  )
}

export default App