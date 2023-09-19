import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function ContactFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setFilterByToEdit(prevFilter => (value))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, isDone, pageIdx } = filterByToEdit

    return (
        <section className="filter">
            <form onSubmit={onSubmitFilter}>
                <div className="">
                    <input
                        onChange={handleChange}
                        value={filterByToEdit}
                        type="text"
                        placeholder="Search"
                        name="txt"
                        className="input"
                    />
                    <div className=""></div>
                </div>
            </form>
            {/*            
            <label >
                Page: 
                <input type="number"
                    name="pageIdx"
                    value={pageIdx}
                    onChange={handleChange}
                />
            </label> */}
        </section>
    )
}