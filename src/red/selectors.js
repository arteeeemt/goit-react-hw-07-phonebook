import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contacts;

export const selectFilteredContacts = state => state.filters;

export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilteredContacts],

  (contacts, filters) => {
    const filterLowCase = filters.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowCase)
    );
  }
);