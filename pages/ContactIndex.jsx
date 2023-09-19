const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { contactService } from '../services/contact.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_CONTACTS } from '../store/reducers/contact.reducer.js'
import { store } from '../store/store.js'
import { ContactList } from '../cmps/ContactList.jsx'

export function ContactIndex() {

    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    // const [contactToAdd, setContactToAdd] = useState(contactService.getEmptyContact())

    useEffect(() => {
        loadContacts()
            .catch(err => {
                console.log('err:', err)
            })
    }, [])



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
            {<ContactList contacts={contacts} />}
        </section >
    )
}