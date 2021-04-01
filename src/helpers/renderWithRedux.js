import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import clickReducer from '../reducers';

const createMockStore = (initialState) => createStore(combineReducers({ clickReducer }), initialState);

const renderWithRedux = (
  component,
  { initialState, store = createMockStore(initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

export default renderWithRedux;
