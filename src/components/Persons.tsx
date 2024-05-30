import { Person } from "../customType";
import contactService from '../services'


type PersonsProp = {
    filteredList: () => Array<Person>;
    persons: Array<Person>;
    setPersons: Function;
    msgType: string;
    content: string;
    showNotification: boolean;
    setShowNotification: Function;
    setMessage: Function;
}

export default function Persons({ filteredList, persons, setPersons, msgType, content, showNotification, setShowNotification, setMessage }: PersonsProp) {
    const handleDelete = (id: Number, name: string) => {
        confirm(`Delete ${name}?`)
        contactService
            .deleteContact(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
                setMessage({ msgType: 'notify', content: `contact details of ${name} has been removed` })
                setShowNotification(true)
                setTimeout(() => {
                    setMessage({ msgType: "", content: "" })
                    setShowNotification(false)
                }, 3000)

            })
            .catch(err => console.log(err))
    }
    return (
        <table border={2}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone number</th>
                </tr>
            </thead>
            <tbody>
                {filteredList().map((person: Person) => (
                    <tr key={person.name}>
                        <td>{person.name}</td>
                        <td>{person.phone}</td>
                        <td><button onClick={() => handleDelete(person.id, person.name)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
            <tfoot>

            </tfoot>
        </table>
    )
}