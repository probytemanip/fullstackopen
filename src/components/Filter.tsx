type FilterProps = {
    filterby: string;
    setFilterBy: Function;
}

export default function Filter({ filterby, setFilterBy }: FilterProps) {

    return (
        <section className="filter">
            <label htmlFor="search">filter shown with</label>
            <input type="text" value={filterby} id="search" onChange={(e) => setFilterBy(e.target.value)} />
        </section>
    )
}