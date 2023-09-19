const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactEdit() {

    const navigate = useNavigate()
    const params = useParams()

    const [contactToEdit, setContactToEdit] = useState(contactService.getEmptyContact())

    useEffect(() => {
        if (params.contactId) loadContact()
    }, [])

    function loadContact() {
        contactService.getById(params.contactId)
            .then(setContactToEdit)
            .catch(err => {
                console.log('Had issued in contact edit:', err);
                navigate('/contact')
                // showErrorMsg('Todo not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setContactToEdit(prevCarToEdit => ({ ...prevCarToEdit, [field]: value }))
    }




    function onSaveContact(ev) {
        ev.preventDefault()
        contactService.save(contactToEdit)
            .then(() => navigate('/contact'))
            .catch(err => {
                showErrorMsg('Cannot save contact', err)
            })
    }

    const { txt } = contactToEdit

    return (
        <section className="contact-edit">
            <h2>Contact Edit</h2>
            <section className="car-edit">
            <form onSubmit={onSaveContact} >
                {/* <label htmlFor="vendor">Vendor:</label>
                <input onChange={handleChange} value={vendor} type="text" name="vendor" id="vendor" />

                <label htmlFor="maxSpeed">Max Speed:</label>
                <input onChange={handleChange} value={maxSpeed} type="number" name="maxSpeed" id="maxSpeed" /> */}

                <button>Save</button>
            </form>
        </section>
        </section>
    )


}








