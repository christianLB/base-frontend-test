import moment from 'moment';

import {
    FETCH_READING_PENDING,
    FETCH_READING_FULFILLED,
    UPDATE_READING_PENDING,
    UPDATE_READING_FULFILLED,
    RANGE_CHANGE
} from '../actions/ReadingActions';


// INITIALIZE STATE

const initialState = {
    reading: [],
    fetching: false,
    fetched: false,
    failed: false,
    updating: false,
    indexUpdated: -1,
    results: false,
    range: {
        start: moment().subtract(5, 'hours'),
        end: moment()
    }
};


// REDUCER
const updateReading = (reading, newReading, index) => {
    reading[index].value1 = newReading.value1;
    reading[index].value2 = newReading.value2;
    reading[index].updating = false;
    return reading;
};

const setUpdating = (reading, index) => {
    reading[index].updating = true;
    return reading;
};

export const FetchReadingReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_READING_PENDING:
            return {
                ...state,
                reading: [],
                fetching: true,
                fetched: false,
                failed: false
            };
        case FETCH_READING_FULFILLED:
            return {
                ...state,
                reading: action.payload.reverse(),
                results: action.payload.length > 0 ? true : false,
                fetching: false,
                fetched: true,
                failed: false,
            };
        case UPDATE_READING_PENDING:
            return {
                ...state,
                updating: true,
                reading: setUpdating(state.reading, action.meta.index)
            };
        case UPDATE_READING_FULFILLED:
            return {
                ...state,
                updating: false,
                indexUpdated: action.meta.index,
                reading: updateReading(state.reading, action.meta.newReading, action.meta.index)
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
