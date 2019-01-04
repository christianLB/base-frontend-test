// IMPORT PACKAGE REFERENCES

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// COMPONENT

export class InputEditor extends Component {

    constructor(props) {
        super(props);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.getValue = this.getValue.bind(this);

        this.state = {edit:false};
        this.ref = React.createRef();
    }

    toggleEdit(e) {
        e.preventDefault();
        this.setState({edit: !this.state.edit});
    }

    componentDidUpdate() {
        this.checkFocus();
    }

    checkFocus() {
        if (this.state.edit) {
            this.ref.current.focus();
        }
    }

    getValue() {
        return this.state.edit ?
            this.ref.current.value
            : this.props.defaultValue;
    }

    handleBlur(e) {
        e.preventDefault();
        this.toggleEdit(e);
        this.props.onChange();
    }

    handleSubmit(e) {
        if (e.key==='Enter' && !isNaN(this.getValue())) {
            this.toggleEdit(e);
            this.props.onChange();
        }
        // e.preventDefault();
    }

    handleFocus() {
        this.ref.current.select();
    }

    renderInput = () => {
        const { defaultValue } = this.props;
        const { handleBlur, handleSubmit, handleFocus, ref, state, toggleEdit } = this;

        if (state.edit) {
            return <input
                className={'editbox'}
                onKeyPress={handleSubmit}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type='text'
                defaultValue={defaultValue}
                tabIndex={0}
                ref={ref}
            />;
        } else {
            return <h5
                onClick={toggleEdit}
                className="mb-1">{defaultValue}</h5>;
        }
    }

    render() {
        const input = this.renderInput();
        return(
            input
        );
    }
}

InputEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired
};
