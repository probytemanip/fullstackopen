import { PersonDetails } from "../customType";


type PersonFormProps = {
    handleSubmit: React.FormEventHandler;
    details: PersonDetails;
    setDetails: Function;
}

export default function PersonForm({ handleSubmit, details, setDetails }: PersonFormProps) {

    return (
        <form onSubmit={handleSubmit} id="pform">
            <div>
                <label htmlFor="fname">Name</label>
                <input type="text" name="fname" id="fname" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} required />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="number" name="phone" id="phone" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} required />
            </div>
            <button type="submit">add</button>
        </form>
    )
}