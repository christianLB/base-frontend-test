import moment from 'moment';

import {
    FETCH_READING_PENDING,
    FETCH_READING_FULFILLED,
    FETCH_READING_REJECTED,
    UPDATE_READING_PENDING,
    UPDATE_READING_FULFILLED,
    UPDATE_READING_REJECTED,
    RANGE_CHANGE
} from '../actions/ReadingActions';


// INITIALIZE STATE

const initialState = {
    reading: [],
    fetching: false,
    fetched: false,
    fetchFailed: false,
    updating: false,
    updateFailed: false,
    updatingId: '',
    results: false,
    range: {
        start: moment().subtract(5, 'hours'),
        end: moment()
    }
};


const updateReading = (reading, newReading) => {
    const index = reading.findIndex(elem => elem.id === newReading.id);
    reading[index].value1 = newReading.value1;
    reading[index].value2 = newReading.value2;
    return reading;
};

// REDUCER
export const FetchReadingReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_READING_PENDING:
            return {
                ...state,
                reading: [],
                fetching: true,
                fetched: false,
                fetchFailed: false
            };
        case FETCH_READING_FULFILLED:
            return {
                ...state,
                reading: action.payload.reverse(),
                results: action.payload.length > 0 ? true : false,
                fetching: false,
                fetched: true,
                fetchFailed: false
            };
        case FETCH_READING_REJECTED:
            return {
                ...state,
                fetching: false,
                fetched: false,
                fetchFailed: true
            };
        case UPDATE_READING_PENDING:
            return {
                ...state,
                updating: true,
                updatingId: action.meta.id
            };
        case UPDATE_READING_FULFILLED:
            return {
                ...state,
                updating: false,
                updateFailed: false,
                updatingId: '',
                reading: updateReading(state.reading, action.meta)
            };
        case UPDATE_READING_REJECTED:
            return {
                ...state,
                updateFailed: true
            };
        case RANGE_CHANGE:
            return {
                ...state,
                range: action.payload
            };
        default:
            return state;
    }
};
