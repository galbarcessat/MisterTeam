const { useParams, useNavigate } = ReactRouterDOM

export function TodoPreview({ contact }) {

    const navigate = useNavigate()


    return (
        <div className="list-item">
            <p>{contact.firstName}, {contact.lastName}</p>
            <p>{contact.desc}</p>
            <button onClick={() => navigate(`/contact/${contact._id}`)}>More Details</button>
        </div>
    )
}