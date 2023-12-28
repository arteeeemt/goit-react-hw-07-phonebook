import { useDispatch } from 'react-redux';
import { ListItem, Button } from './ListItem.styled';
import { deleteContact } from '../../red/operations';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const removeContact = () => {
    dispatch(deleteContact(id));
  };
  return (
    <ListItem>
      <p>
        {name}: {number}
      </p>
      <Button type="button" onClick={removeContact}>
        Delete
      </Button>
    </ListItem>
  );
};
export default ContactItem;