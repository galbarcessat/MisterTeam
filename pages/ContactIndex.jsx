const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { useParams, useNavigate, Link } = ReactRouterDOM


import { contactService } from '../services/contact.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_CONTACTS, SET_FILTER_BY, SET_SORTBY } from '../store/reducers/contact.reducer.js'
import { store } from '../store/store.js'
import { ContactList } from '../cmps/ContactList.jsx'
import { ContactFilter } from '../cmps/ContactFilter.jsx'

export function ContactIndex() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    const filterBy = useSelector(storeState => storeState.contactModule.filterBy)
    const sortBy = useSelector(storeState => storeState.contactModule.sortBy)

    // const [contactToAdd, setContactToAdd] = useState(contactService.getEmptyContact())

    useEffect(() => {
        loadContacts(filterBy, sortBy)
            .catch(err => {
                console.log('err:', err)
            })
    }, [filterBy, sortBy])


    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function loadContacts(filterBy, sortBy) {
        // const { filterBy } = store.getState().contactModule
        // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        return contactService.query(filterBy, sortBy)
            .then(contacts => {
                store.dispatch({ type: SET_CONTACTS, contacts })
                console.log('contacts:', contacts)
            })
            .catch(err => {
                console.log('contact action -> Cannot load contacts', err)
                throw err
            })

        // .finally(() => {
        //     store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        // })
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