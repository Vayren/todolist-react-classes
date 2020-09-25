import React, { createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import Priority from './Priority';
import ErrorMessage from './ErrorMessage';

class EditField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editValue: this.props.value,
            priority: this.props.priority,
            isEmptyField: false,
        };

        this.editField = createRef();
        this.editBlock = createRef();
    }

    componentDidMount() {
        this.editField.current.focus();

        this.editField.current.onkeydown = e => {
            if (e.code === 'Enter') this.confirm();
            else if (e.code === 'Escape') this.props.hideEdit();
        }
    }

    setPriority = priority => {
        this.setState({ priority });
    }

    onEditFieldChange = e => {
        this.setState({ editValue: e.target.value })
    }

    confirm = () => {
        if (this.state.editValue === '') {
            this.setEmpty(true);
            this.editField.current.focus();
        } else {
            this.props.hideEdit();
            this.props.updateTodo(this.props.id, this.state.editValue, this.state.priority);
        }
    }

    showError(status) {
        return status ? <ErrorMessage message="Please, type something or hit escape!" /> : null;
    }

    setEmpty = flag => {
        this.setState({ isEmptyField: flag })
    }

    render() {
        return (
            <div className="edit-container" ref={this.editBlock}>
                <div className="edit-container__inner">
                    <input
                        className="list__item-text edit-field"
                        value={this.state.editValue}
                        ref={this.editField}
                        onChange={this.onEditFieldChange}
                    />
                    <Priority defaultPriority={this.state.priority} setPriority={this.setPriority} sizeClass="small" />
                    <div className="edit-field__toolbar">
                        <button className="btn btn-confirm" onClick={this.confirm}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </button>
                        <button className="btn btn-cancel" onClick={this.props.hideEdit}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </div>
                </div>
                <div className="error-message error-message-2">
                    {this.showError(this.state.isEmptyField)}
                </div>
            </div>
        );
    }
}

export default EditField;