const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { useParams, useNavigate, Link } = ReactRouterDOM


import { contactService } from '../services/contact.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_CONTACTS, SET_FILTER_BY } from '../store/reducers/contact.reducer.js'
import { store } from '../store/store.js'
import { ContactList } from '../cmps/ContactList.jsx'
import { ContactFilter } from '../cmps/ContactFilter.jsx'

export function ContactIndex() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    const filterBy = useSelector(storeState => storeState.contactModule.filterBy)

    // const [contactToAdd, setContactToAdd] = useState(contactService.getEmptyContact())

    useEffect(() => {
        loadContacts()
            .catch(err => {
                console.log('err:', err)
            })
    }, [])


    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
    function loadContacts() {
        // const { filterBy } = store.getState().contactModule
        // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        return contactService.query()
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





    return (
        <section >
            <ContactFilter
                onSetFilterBy={onSetFilterBy}
                filterBy={filterBy}
            />
            {<ContactList contacts={contacts} />}
            <button onClick={() => navigate('/contact/edit')}>Add Contact</button>
        </section >
    )
}