import axios from "axios";
import { PersonDetails } from "./customType";

const baseURL = 'http://localhost:3001/contacts'

const getAll = () => {
    return axios.get(baseURL)
}

const create = (newObject: PersonDetails) => {
    return axios.post(baseURL, newObject)
}

const deleteContact = (id: Number) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id: Number, newContact: PersonDetails) => {
    return axios.put(`${baseURL}/${id}`, newContact)
}


export default {
    getAll: getAll,
    create: create,
    deleteContact: deleteContact,
    update: update
}