const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [currContact, setCurrContact] = useState(null)

    useEffect(() => {
        contactService.getById(params.contactId)
            .then(contact => {
                if (!contact) return navigate('/contact')
                setCurrContact(contact)
            })
            .catch(err => {
                console.log('Had issues loading contact', err);
            })
    }, [])

    function onDeleteContact(_id) {
        contactService.remove(_id).then(() => {
            console.log('contact removed id :', _id)
            navigate('/contact')
        }).catch(err => console.log('err:', err))
    }

    if (!currContact) return <h4>Loading...</h4>
    const { _id, firstName, lastName, email, phone, desc } = currContact
    return (
        <section className="contact-details">
            <div className="contact-data-container">
                <h1>Id: {_id}</h1>
                <h1>firstName: {firstName}</h1>
                <h1>lastName: {lastName}</h1>
                <h1>email: {email}</h1>
                <h1>phone: {phone}</h1>
                <h1>desc: {desc}</h1>
                <button className="back-btn" onClick={() => navigate('/contact')}>
                    Back
                </button>
                <button onClick={() => onDeleteContact(_id)}>Delete</button>
                <button><Link to={`/contact/edit/${_id}`}>Edit</Link></button>
            </div>
        </section>
    )
}