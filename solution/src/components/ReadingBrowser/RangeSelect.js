import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';


class RangeSelect extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const range = {
            end: moment()
        };
        range.start = moment().subtract(e.target.value, 'hours');
        this.props.onChange(range);
    }

    render() {
        return <select onChange={this.handleChange}>
            <option defaultValue value="5">Last 5 hours</option>
            <option value="6">Last 6 hours</option>
            <option value="7">Last 7 hours</option>
            <option value="8">Last 8 hours</option>
            <option value="9">Last 9 hours</option>
            <option value="10">Last 10 hours</option>
            <option value="11">Last 11 hours</option>
            <option value="12">Last 12 hours</option>
            <option value="13">Last 13 hours</option>
            <option value="14">Last 14 hours</option>
            <option value="15">Last 15 hours</option>
            <option value="16">Last 16 hours</option>
            <option value="17">Last 17 hours</option>
            <option value="18">Last 18 hours</option>
            <option value="19">Last 19 hours</option>
            <option value="20">Last 20 hours</option>
            <option value="21">Last 21 hours</option>
            <option value="22">Last 22 hours</option>
            <option value="23">Last 23 hours</option>
            <option value="24">Last 24 hours</option>
        </select>;
    }
}

RangeSelect.propTypes = {
    onChange: PropTypes.func.isRequired
};

export { RangeSelect };
