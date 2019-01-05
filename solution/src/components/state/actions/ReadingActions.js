// import { fetchReading } from '../../../services/ZipCodeService';

// FETCH READING ACTION NAMES

export const FETCH_READING_PENDING = 'FETCH_READING_PENDING';
export const FETCH_READING_FULFILLED = 'FETCH_READING_FULFILLED';
export const FETCH_READING_FAILURE = 'FETCH_READING_FAILURE';
export const FETCH_READING = 'FETCH_READING';
export const UPDATE_READING = 'UPDATE_READING';
export const UPDATE_READING_PENDING = 'UPDATE_READING_PENDING';
export const UPDATE_READING_FULFILLED = 'UPDATE_READING_FULFILLED';
export const UPDATE_READING_REJECTED = 'UPDATE_READING_REJECTED';
export const UPDATE_READING_FAILURE = 'UPDATE_READING_FAILURE';
export const RANGE_CHANGE = 'RANGE_CHANGE';
// ACTION GENERATORS
// COMPONENT
const apiUrl = 'http://localhost:8080/reading';
const dateFormat = 'YYYY-MM-DDTHH:mm:ss';

export const changeRangeAction = (range) => ({
    type: RANGE_CHANGE,
    payload: range
});

export const fetchReadingAction = (range) => ({
    type: FETCH_READING,
    payload: () => {
        return fetch(`${apiUrl}?start=${range.start.format(dateFormat)}&end=${range.end.format(dateFormat)}`)
            .then(response => response.json());
    }
});

export const updateReadingAction = (newReading) => ({
    type: UPDATE_READING,
    meta: newReading,
    payload: () => {
        const fail = false;
        const delay = 1000;

        newReading.value1 = parseFloat(parseFloat(newReading.value1).toFixed(2));
        newReading.value2 = parseFloat(parseFloat(newReading.value2).toFixed(2));

        //delayed promise used to show spinner for a second
        if (fail) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('forced');
                }, delay);
            });
        } else {
            return fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                },
                body: JSON.stringify(newReading)
            });
        }
    }
});
