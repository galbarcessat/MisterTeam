const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { contactService } from "../services/contact.service.js"

export function ContactEdit() {
    const params = useParams()
    const navigate = useNavigate()





    return (
        <div>Contact Edit</div>
    )
}
