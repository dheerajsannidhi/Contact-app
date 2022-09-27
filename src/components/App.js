import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import api from '../api/contacts';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

function App() {
  const LOCAL_STORAGE_KEY = "ContactsList";

  // const retriveContacts = localStorage.getItem(LOCAL_STORAGE_KEY)
  //   ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   : [];

  //RetriveContacts

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const [ContactsList, setContacts] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [searchResults, setsearchResults] = useState([]);


  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,

    };
    const response = await api.post("/contacts", request);
    setContacts([...ContactsList, response.data]);
    // setContacts([...ContactsList, { id: uuid(), ...contact }]);
  }
  const updateContactHandler = async (contact) => {

    const response = await api.put(`/contacts/${contact.id}`, contact);

    setContacts(
      ContactsList.map((contact) => {
        return contact.id === response.data.id ? { ...response.data } : contact;
      })
    );
  };



  const removeContactHandler = async (id) => {
    await api.delete(`contacts/${id}`);
    const newContactList = ContactsList.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setsearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = ContactsList.filter((contact) => {

        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })

      setsearchResults(newContactList);
    }
    else {
      setsearchResults(ContactsList);
    }
  };

  useEffect(() => {
    if (!!ContactList) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ContactsList));
    }

  }, [ContactsList]);

  useEffect(() => {
    console.log("inside useEffect");
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) {
        console.log("all contacts----->", allContacts);
        setContacts(allContacts);
      }
    }
    getAllContacts();
  }, []);


  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<ContactList contacts={searchTerm.length<1 ? ContactsList: searchResults} getContactId={removeContactHandler}
              term={searchTerm} searchKeyword={searchHandler} />}
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />

          <Route
            path="/edit"
            element={<EditContact updateContactHandler={updateContactHandler} />}
          />

          <Route
            path="/contact/:id"
            element={<ContactDetail />}
          />

        </Routes>


      </Router>

    </div>


  );
}

export default App;
