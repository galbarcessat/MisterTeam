const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux


import { contactService } from "../services/contact.service.js"
import { UPDATE_CONTACT } from "../store/reducers/contact.reducer.js"

export function ContactEdit() {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

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
            .then(() => {
                dispatch({ type: UPDATE_CONTACT, contact: contactToEdit })
                navigate('/contact')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Cannot save contact', err)
            })
    }
    const { _id, firstName, lastName, email, phone, desc } = contactToEdit

    return (
        <section className="contact-edit">
            <h2>Contact Edit</h2>
            <section className="car-edit">
                <form onSubmit={onSaveContact} >
                    <label htmlFor="firstName">First Name:</label>
                    <input onChange={handleChange} value={firstName} type="text" name="firstName" id="firstName" />

                    <label htmlFor="lastName">Last Name:</label>
                    <input onChange={handleChange} value={lastName} type="text" name="lastName" id="lastName" />

                    <label htmlFor="email">Email:</label>
                    <input onChange={handleChange} value={email} type="text" name="email" id="email" />

                    <label htmlFor="phone">Phone:</label>
                    <input onChange={handleChange} value={phone} type="number" name="phone" id="phone" />

                    <label htmlFor="desc">Description:</label>
                    <input onChange={handleChange} value={desc} type="text" name="desc" id="desc" />

                    <button>Save</button>
                </form>
            </section>
        </section>
    )


}








