const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { useParams, useNavigate, Link } = ReactRouterDOM


import { contactService } from '../services/contact.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_CONTACTS, SET_FILTER_BY, SET_SORTBY } from '../store/reducers/contact.reducer.js'
import { loadContacts } from '../store/actions/contacts.actions.js'
import { store } from '../store/store.js'
import { ContactList } from '../cmps/ContactList.jsx'
import { ContactFilter } from '../cmps/ContactFilter.jsx'

export function ContactIndex() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    const filterBy = useSelector(storeState => storeState.contactModule.filterBy)
    const sortBy = useSelector(storeState => storeState.contactModule.sortBy)

    useEffect(() => {
        loadContacts(filterBy, sortBy)
            .then(() => console.log('success loading contacts:'))
            .catch(err => {
                console.log('err:', err)
            })
    }, [filterBy, sortBy])


    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }


    function onSetSortBy(sortBy) {
        dispatch({ type: SET_SORTBY, sortBy })

    }

    return (
        <section className='select-container' >
            {/* //SORT BY */}
            <select name="sortBySelect" onChange={() => onSetSortBy(event.target.value)}>
                <option value="noSort">No Sort</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
            </select>
            <ContactFilter
                onSetFilterBy={onSetFilterBy}
                filterBy={filterBy}
            />
            {<ContactList contacts={contacts} />}
            <button onClick={() => navigate('/contact/edit')}>Add Contact</button>
        </section >
    )
}