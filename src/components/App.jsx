import ContactForm from './Form/Form';
import { Container, Section, Title, SectionTitle, Message } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../red/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../red/operations';
import { Loader } from './Loader';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Title>Phonebook</Title>
      <Section>
        <SectionTitle>Add contact</SectionTitle>
        <ContactForm />
      </Section>
      <Section>
        <SectionTitle>Contacts</SectionTitle>
        {contacts.length !== 0 ? (
          <>
            <Filter />
            {isLoading && !error && <Loader />}
            <ContactList />
          </>
        ) : (
          <Message>
            There are no contacts in your phonebook. Please add your first
            contact!
          </Message>
        )}
      </Section>
    </Container>
  );
};