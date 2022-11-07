import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../redux/itemsSlice';
import s from './InputForm.module.css';

export function InputForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();

  const inputOperator = event => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'number') {
      setNumber(event.target.value);
    } else {
      throw new Error('Unexpected value');
    }
  };

  const formSubmit = event => {
    event.preventDefault();
    if (items.reduce((acc, item) => [...acc, item.name], []).includes(name)) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addItem({ name, number }));
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={s.form} onSubmit={formSubmit}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. 
                        For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={inputOperator}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={inputOperator}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}
