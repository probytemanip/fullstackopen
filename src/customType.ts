export type PersonDetails = {
    name: string;
    phone: string;
}
export type Person = PersonDetails & { id: Number }