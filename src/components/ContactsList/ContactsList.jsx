import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../../redux/itemsSlice';
import s from './ContactsList.module.css';

export function ContactsList() {
  const items = useSelector(state => state.items);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const currentContacts = items.filter(item => item.name.toLowerCase().includes(filter));

  return (
    <ul className={s.contactsList}>
      {currentContacts.map(({ id, name, number }) => (
        <li key={id}>
          <div className={s.contact}>
            <p>
              {name}: <span>{number}</span>
            </p>
            <button type="button" onClick={() => dispatch(deleteItem(id))}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
