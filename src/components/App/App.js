import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import { AppContainer, AppTitle, AppSubTitle } from './App.styled';
import './App.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  };

  addContact = contact => {
    const { contacts } = this.state;

    const contactToAdd = {
      ...contact,
      id: uuidv4(),
    };

    const stateContact = contacts.find(item => item.name === contact.name);

    if (stateContact) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    this.setState(state => ({
      contacts: [...state.contacts, contactToAdd],
    }));
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts } = this.state;

    return (
      <AppContainer>
        <AppTitle>Phonebook</AppTitle>
        <ContactForm onAddContact={this.addContact} />
        <AppSubTitle>Contacts</AppSubTitle>
        <ContactList items={contacts} onDeleteContact={this.deleteContact} />
      </AppContainer>
    );
  }
}
