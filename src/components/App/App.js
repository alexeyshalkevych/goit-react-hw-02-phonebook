import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import ContactFilter from '../ContactFilter/ContactFilter';
import filterContacts from '../../utils/filterContacs';
import findContact from '../../utils/findContact';
import { AppContainer, AppTitle, AppSubTitle } from './App.styled';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  addContact = contact => {
    const { contacts } = this.state;

    const contactToAdd = {
      ...contact,
      id: uuidv4(),
    };

    if (this.isValidContact(contact)) {
      const stateContact = findContact(contacts, contact);

      if (stateContact) {
        alert(`${contact.name} is already in contacts.`);
        return;
      }

      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd],
      }));
    }
  };

  isValidContact = ({ name, number }) => {
    if (name.length <= 1 || name.trim() === 0) {
      alert(`Your name is not valid. Please enter correct information.`);
      return false;
    }

    if (!number.match(/^\(?([0-9]{3})\)?[- ]?([0-9]{2})[- ]?([0-9]{2})$/)) {
      alert(`Your number is not valid. Please enter correct information.`);
      return false;
    }

    return true;
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = filterContacts(contacts, filter);

    return (
      <AppContainer>
        <AppTitle>Phonebook</AppTitle>
        <ContactForm onAddContact={this.addContact} />
        <AppSubTitle>Contacts</AppSubTitle>
        {contacts.length >= 2 && (
          <ContactFilter value={filter} onChangeFilter={this.changeFilter} />
        )}
        <ContactList
          items={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </AppContainer>
    );
  }
}
