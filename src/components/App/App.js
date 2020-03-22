import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from '../ContactForm/ContactForm';
import { AppContainer, AppTitle } from './App.styled';
import './App.css';

export default class App extends Component {
  state = {
    contacts: [],
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

  render() {
    return (
      <AppContainer>
        <AppTitle>Phonebook</AppTitle>
        <ContactForm onAddContact={this.addContact} />
      </AppContainer>
    );
  }
}
