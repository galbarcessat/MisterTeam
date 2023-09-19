import { store } from '../store.js'
import { SET_CONTACTS, SET_FILTER_BY, SET_SORTBY } from '../reducers/contact.reducer.js'
import { contactService } from '../../services/contact.service.js'


export function loadContacts(filterBy, sortBy) {
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