import React, { createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import ErrorMessage from './ErrorMessage';

class EditField extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            editValue: this.props.value,
            isEmptyField: false
        };
        this.editField = createRef();
        this.editBlock = createRef();
    }

    componentDidMount() {
        this.editField.current.focus();

        this.editField.current.onkeydown = e => {
            if(e.code === 'Enter') this.enterPressed();
            else if(e.code === 'Escape') this.escPressed();
        }
    }

    enterPressed = () => {
        this.confirm();
    }

    escPressed = () => {
        this.cancel();
    }

    onEditFieldChange = e => {
        this.setState({ editValue: e.target.value })
    }

    confirm = () => {
        if(this.state.editValue === '') {
            this.setState({ isEmptyField: true })
        } else {
            this.props.hideEdit();
            this.props.updateTodo(this.props.id, this.state.editValue);
        }
    }

    cancel = () => {
        this.props.hideEdit();
    }

    showError(status){
        return status ? <ErrorMessage message="Please, type something or hit escape!"/> : null;
    }

    render() {
        return (
            <div className="edit-field" ref={this.editBlock}>
                <div className="edit-field__content">
                    <input 
                        className="list__item-text edit-message" 
                        value={ this.state.editValue } 
                        ref={ this.editField }
                        onChange={this.onEditFieldChange}
                    />
                    <div className="edit-message__toolbar">
                        <button className="btn btn-confirm" onClick={this.confirm}>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </button>
                        <button className="btn btn-cancel" onClick={this.cancel}>
                            <FontAwesomeIcon icon={faTimesCircle}/>
                        </button>
                    </div>
                </div>
                <div className="error-field error-field-2">
                    { this.showError(this.state.isEmptyField) }
                </div>
            </div>
        );
    }
}

export default EditField;