import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './app.module.css';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const books = JSON.parse(localStorage.getItem('my-contacts'));
    return books ? books : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const id = nanoid();
    const { name, number } = data;

    setContacts(prevContacts => {
      return [{ name, number, id }, ...prevContacts];
    });
  };

  const handleChangeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };
  const filterContacts = () => {
    if (!filter) {
      return contacts;
    }
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
    return result;
  };

  const doubleContact = name => {
    return contacts.find(contact => contact.name.toLowerCase() === name);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} doubleContact={doubleContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleChangeFilter} filter={filter} />
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
    </div>
  );
};

export default App;

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('my-contacts'));
//     if (contacts) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('my-contacts', JSON.stringify(contacts));
//     }
//   }
