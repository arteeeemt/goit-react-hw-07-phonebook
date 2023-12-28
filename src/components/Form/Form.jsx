import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Field, FormGroup, ErrorMessage } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../red/selectors';

import { addContact } from '../../red/operations';
import Notiflix from 'notiflix';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.string().required('Number is required'),
});

const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;

    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      resetForm();
      Notiflix.Notify.failure(`${name} is already in contacts!`);
      return;
    }

    dispatch(addContact({ name, number }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={FormSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormGroup>
          Name
          <Field name="name" type="text" placeholder="Enter a name" />
          <ErrorMessage name="name" component="span" />
        </FormGroup>

        <FormGroup>
          Number
          <Field name="number" type="tel" placeholder="Enter a phone-number" />
          <ErrorMessage name="number" component="span" />
        </FormGroup>

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;