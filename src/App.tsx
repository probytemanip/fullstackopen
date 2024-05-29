import { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { Person, PersonDetails } from './customType';
import contactService from './services'


export default function App() {
  const [details, setDetails] = useState<PersonDetails>({ name: "", phone: "" })


  const [persons, setPersons] = useState<Array<Person>>([])

  const [filterby, setFilterBy] = useState("")

  const filteredList = () => {
    if (filterby.length === 0) {
      return persons;
    }
    return persons.filter(person => person.name.toLowerCase().includes(filterby.toLowerCase()))

  }


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!ifPersonAlreadyExists() && Boolean(details.name) && Boolean(details.phone)) {
      console.log("values accepted")
      const newPerson = {
        ...details,
      }
      contactService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setDetails({ name: "", phone: "" })
        })
        .catch(err => console.log(err))
      return
    }
    if (ifPersonAlreadyExists()) {

      const wantToUpdate = confirm(`${details.name} is already added to phonebook, replace the old number with a new one?`)
      if (wantToUpdate) {
        const newDetails: PersonDetails = {
          name: details.name,
          phone: details.phone
        }
        contactService
          .getAll()
          .then((response) => {
            const result: Array<Person> = response.data
            const contactToUpdate = result.find(contact => contact.name === details.name)
            if (contactToUpdate !== undefined) {
              contactService.update(contactToUpdate.id, newDetails).then(() => {
                console.log(`${contactToUpdate.name} phone is updated to ${newDetails.phone}`)
                contactService
                  .getAll()
                  .then(response => setPersons(response.data))
                  .catch(err => console.log(err))

              })
                .catch(err => console.log(err))
            }
          })
      }
    }
  }
  const ifPersonAlreadyExists = () => {
    if (persons?.findIndex(person => person.name.toLowerCase() === details.name.toLowerCase()) >= 0) {
      return true;

    }
    return false;
  }

  const updatedList = async () => {
    contactService
      .getAll()
      .then(response => setPersons(response.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    updatedList()
  }, [])


  return (
    <div id="Phonebook">
      <h2>Phonebook</h2>
      <Filter filterby={filterby} setFilterBy={setFilterBy} />
      <PersonForm handleSubmit={handleSubmit} details={details} setDetails={setDetails} />
      <section id="phonelist">
        <h2>Numbers</h2>
        <Persons filteredList={filteredList} persons={persons} setPersons={setPersons} />

      </section>

    </div>
  )
}