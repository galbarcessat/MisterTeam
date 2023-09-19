const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactDetails() {
    const params = useParams()
    const navigate = useNavigate()

    const [currContact, setCurrContact] = useState(null)

    useEffect(() => {
        contactService.getById(params.id)
            .then(contact => {
                if (!contact) return navigate('/contact')
                setCurrContact(contact)
            })
            .catch(err => {
                console.log('Had issues loading contact', err);
            })
    }, [])

    if (!currContact) return <h4>Loading...</h4>
    const { _id, firstName, lastName, email, phone, desc } = currTodo
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
            </div>
        </section>
    )
}