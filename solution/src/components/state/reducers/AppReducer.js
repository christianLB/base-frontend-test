// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS

import { FetchReadingReducer } from '../reducers/FetchReadingReducer';


// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    readings: FetchReadingReducer
});
