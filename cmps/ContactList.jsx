import { TodoPreview } from "./TodoPreview.jsx"



export function ContactList({ contacts }) {

    console.log('contacts:', contacts)


    return (
        <div className="list">
            <ul>
                {contacts.map((contact) => (
                    <li key={contact._id}>
                        <TodoPreview contact={contact} />
                    </li>
                ))}
            </ul>
        </div>
    )

}