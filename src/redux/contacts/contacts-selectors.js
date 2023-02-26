export const getAllContacts = store => store.contacts;

export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts;
  }
  const result = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(filter.toLowerCase());
  });
  return result;
};
