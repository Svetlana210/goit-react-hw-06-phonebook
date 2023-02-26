import { useEffect } from 'react';

import styles from './app.module.css';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/filter/filter-slice';
import { addContact, deleteContact } from '../redux/contacts/contacts-slice';
import {
  getFilteredContacts,
  getAllContacts,
} from '../redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

const App = () => {
  const contacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContacts);

  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = ({ name, number }) => {
    const action = addContact({ name, number });
    dispatch(action);
  };

  const handleChangeFilter = e => {
    const { value } = e.currentTarget;
    dispatch(setFilter(value));
  };

  const doubleContact = name => {
    return contacts.find(contact => contact.name.toLowerCase() === name);
  };

  const onDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <Form onSubmit={onAddContact} doubleContact={doubleContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleChangeFilter} filter={filter} />
      <ContactList
        contacts={filteredContacts}
        deleteContact={onDeleteContact}
      />
    </div>
  );
};

export default App;
