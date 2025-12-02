import { useState, useEffect } from 'react';
import personService from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  let color = 'green';
  if (type === 'error') color = 'red';
  if (type === 'warning') color = 'orange';

  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    borderColor: color
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};

const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    filter shown with <input value={searchTerm} onChange={handleSearchChange} />
  </div>
);

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <div>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button onClick={addPerson}>add</button>
    </div>
  </div>
);

const Person = ({ person, handleDelete }) => (
  <div>
    {person.name} {person.number}{' '}
    <button
      onClick={() => handleDelete(person.id, person.name)}
      style={{ marginLeft: '10px' }}
    >
      delete
    </button>
  </div>
);

const Persons = ({ personsToShow, handleDelete }) => (
  <div>
    {personsToShow.map(person =>
      <Person
        key={person.id}
        person={person}
        handleDelete={handleDelete}
      />
    )}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('success');

  const showNotification = (message, type = 'success') => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = () => {
    if (newName.trim() === '') {
      alert('Please enter a name');
      return;
    }

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
            showNotification(`Changed number for ${returnedPerson.name}`);
          })
          .catch(error => {
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              'error'
            );
            setPersons(persons.filter(p => p.id !== existingPerson.id));
            setNewName('');
            setNewNumber('');
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    };

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showNotification(`Added ${returnedPerson.name}`);
      })
      .catch(error => {
        console.error('Error adding person (axios):', error);

        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }

        showNotification('Error adding person', 'error');
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          showNotification(`Deleted ${name}`, 'warning');
        })
        .catch(error => {
          showNotification(
            `Information of ${name} has already been removed from server`,
            'error'
          );
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const personsToShow = searchTerm === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Phonebook</h2>

      {/* Display notification */}
      <Notification message={notification} type={notificationType} />

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;