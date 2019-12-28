import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({ person, onDelete }) => (
  <div>
    {person.name} {person.number} <button value={person.id} onClick={onDelete}>delete</button>
  </div>
)

const Persons = ({ persons, onDelete }) => (
  persons.map(person =>
    <Person key={person.name} person={person} onDelete={onDelete} />
  )
)

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const personsToShow = persons.filter(person => person.name.toUpperCase().includes(searchFilter.toUpperCase()))

  const addContact = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)

    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { 
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService.update(person.id, personObject).then(response =>
          setPersons(persons.map(p => p.name !== newName ? p : response.data))
        )
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject).then(response => {
        setPersons(persons.concat(response.data))
      })
    }

    setNewName('')
    setNewNumber('')
  }

  const removeContact = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.id === parseInt(event.target.value))
    if (window.confirm(`Delete ${person.name}?`)) { 
      personService.remove(person.id).then(
        setPersons(persons.filter(p => p.id !== person.id))
      )
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

      <Persons persons={personsToShow} onDelete={removeContact} />

    </div>
  )
}

export default App