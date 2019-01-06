// IMPORT PACKAGE REFERENCES

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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

        this.style = {
            width: '100px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };
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
        const { defaultValue, edit } = this.props;
        const { handleBlur, handleSubmit, handleFocus, ref, state, toggleEdit } = this;

        if (state.edit || edit) {
            return <TextField
                className={'editbox'}
                margin={'normal'}
                onKeyPress={handleSubmit}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type='text'
                defaultValue={defaultValue}
                tabIndex={0}
                inputRef={ref}
                inputProps={{
                    style: {textAlign: 'center'}
                }}
            />;
        } else {
            return <span
                style={{cursor: 'pointer'}}
                onClick={toggleEdit}
            >{defaultValue}</span>;
        }
    }

    render() {
        const { style, renderInput } = this;
        const input = renderInput();
        return(
            <div style={style}>
                {input}
            </div>
        );
    }
}

InputEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired
};
