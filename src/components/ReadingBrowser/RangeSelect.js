import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment';


class RangeSelect extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {time: 5};
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });

        const range = {
            start: moment().subtract(e.target.value, 'hours'),
            end: moment(),
            hours: e.target.value
        };
        this.props.onChange(range);
    }

    render() {
        const { handleChange, state } = this;

        return <FormControl
            style={{margin: '10px 0 20px 51px'}}
        >
            <InputLabel htmlFor="time-helper">Time Range</InputLabel>
            <Select
                value={parseInt(state.time)}
                autoWidth
                onChange={handleChange}
                inputProps={{
                    name: 'time',
                    id: 'time-helper',
                }}
            >
                <MenuItem value={5}>Last 5 hours</MenuItem>
                <MenuItem value={6}>Last 6 hours</MenuItem>
                <MenuItem value={7}>Last 7 hours</MenuItem>
                <MenuItem value={8}>Last 8 hours</MenuItem>
                <MenuItem value={9}>Last 9 hours</MenuItem>
                <MenuItem value={10}>Last 10 hours</MenuItem>
                <MenuItem value={11}>Last 11 hours</MenuItem>
                <MenuItem value={12}>Last 12 hours</MenuItem>
                <MenuItem value={13}>Last 13 hours</MenuItem>
                <MenuItem value={14}>Last 14 hours</MenuItem>
                <MenuItem value={15}>Last 15 hours</MenuItem>
                <MenuItem value={16}>Last 16 hours</MenuItem>
                <MenuItem value={17}>Last 17 hours</MenuItem>
                <MenuItem value={18}>Last 18 hours</MenuItem>
                <MenuItem value={19}>Last 19 hours</MenuItem>
                <MenuItem value={20}>Last 20 hours</MenuItem>
                <MenuItem value={21}>Last 21 hours</MenuItem>
                <MenuItem value={22}>Last 22 hours</MenuItem>
                <MenuItem value={23}>Last 23 hours</MenuItem>
                <MenuItem value={24}>Last 24 hours</MenuItem>
            </Select>
        </FormControl>;
    }
}

RangeSelect.propTypes = {
    onChange: PropTypes.func.isRequired
};

export { RangeSelect };
