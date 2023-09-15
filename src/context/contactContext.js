import {createContext} from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => {},
    /*contact: {},*/
    setContacts: () => {},
    setFilteredContacts: () => {},
    contacts: [],
    filteredContacts: [],
    groups: [],
    /*errors: [],*/
    onContactChange: () => {},
    deleteContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
})