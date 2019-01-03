import fetch from 'cross-fetch';
import { receiveReading, requestReading } from '../components/state/actions/ZipCodeActions';

//const simulateError = false;
export const fetchReading = (range) => {
    return dispatch => {
        dispatch(requestReading(range));
        return fetch('http://localhost:8080/reading')
            .then(response => response.json())
            .then(json => dispatch(receiveReading(range, json)));
    };
    /* return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(zips);
            }
        }, 1000);
    });*/
};
