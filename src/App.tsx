import { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { Person, PersonDetails } from './customType';
import contactService from './services'
import Notification from './components/Notification';

export type MessageType = {
  msgType: string;
  content: string;
}


export default function App() {
  const [details, setDetails] = useState<PersonDetails>({ name: "", phone: "" })
  const [message, setMessage] = useState({ msgType: "notify", content: "" })
  const [showNotification, setShowNotification] = useState(false)


  const [persons, setPersons] = useState<Array<Person>>([])

  const [filterby, setFilterBy] = useState("")

  const filteredList = () => {
    if (filterby.length === 0) {
      return persons;
    }
    return persons.filter(person => person.name.toLowerCase().includes(filterby.toLowerCase()))

  }
  function toastDetails(messageType, message) {
    setMessage({ msgType: messageType, content: message })
    setShowNotification(true)
    setTimeout(() => {
      setMessage({ msgType: "", content: "" })
      setShowNotification(false)
    }, 3000)
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

          setMessage({ content: "New contact added", msgType: "notify" })
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
            setMessage({ content: "", msgType: "" })
          }, 3000)
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
                toastDetails("notify", `${contactToUpdate.name} contact updated`)
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
      {showNotification && <Notification msgType={message.msgType} content={message.content} />}
      <PersonForm handleSubmit={handleSubmit} details={details} setDetails={setDetails} />
      <section id="phonelist">
        <h2>Numbers</h2>
        <Persons filteredList={filteredList} persons={persons} setPersons={setPersons} msgType={message.msgType} content={message.content} showNotification={showNotification} setShowNotification={setShowNotification} setMessage={setMessage} />

      </section>

    </div>
  )
}