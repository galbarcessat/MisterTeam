import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'contactDB'
_createContacts()

export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact
}

function query(filterBy = '', sortBy = 'noSort') {
    return storageService.query(STORAGE_KEY)
        .then(contacts => {
            if (filterBy) {
                const regExp = new RegExp(filterBy, 'i')
                contacts = contacts.filter(contact => regExp.test(contact.firstName))
            }
            if (sortBy === 'noSort') {
                contacts = contacts

            } else if (sortBy === 'firstName') {
                contacts = contacts.sort((contact1, contact2) => {
                    return contact1.firstName.localeCompare(contact2.firstName);
                })

            } else if (sortBy === 'LastName') {
                contacts = contacts.sort((contact1, contact2) => {
                    return contact1.LastName.localeCompare(contact2.LastName);
                })
            }
            return contacts
        })
}

function getById(contactId) {
    return storageService.get(STORAGE_KEY, contactId)
}

function remove(contactId) {
    return storageService.remove(STORAGE_KEY, contactId)
}

function save(contact) {
    if (contact._id) {
        return storageService.put(STORAGE_KEY, contact)
    } else {

        return storageService.post(STORAGE_KEY, contact)
    }
}

function getEmptyContact() {
    return {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        desc: ''
    }
}

function _createContacts() {
    let contacts = utilService.loadFromStorage(STORAGE_KEY)
    if (!contacts || !contacts.length)
        contacts = [
            {
                _id: utilService.makeId(),
                firstName: 'Omer',
                lastName: 'Vered',
                email: 'omervered@gmail.com',
                phone: '0548844880',
                desc: 'Tech team lead'
            },
            {
                _id: utilService.makeId(),
                firstName: 'Yarin',
                lastName: 'Keren',
                email: 'yarin@gmail.com',
                phone: '0542245680',
                desc: 'QA team lead'
            },
            {
                _id: utilService.makeId(),
                firstName: 'Ido',
                lastName: 'Halbani',
                email: 'idodo@gmail.com',
                phone: '0542244450',
                desc: 'CTO'
            },
            {
                _id: utilService.makeId(),
                firstName: 'Gal',
                lastName: 'Bar Natan',
                email: 'gal@gmail.com',
                phone: '0545874880',
                desc: 'FullStack Eng'
            }
        ]
    utilService.saveToStorage(STORAGE_KEY, contacts)
}