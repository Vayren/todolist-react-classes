import React from 'react';

import ErrorMessage from './ErrorMessage';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            todo: '',
            showErrorField: false
        };
        this.inputRef = React.createRef();
    }


    //Delete error message when add-field lost the focus
    componentDidMount() {
        this.inputRef.current.onblur = () => this.setEmpty(false);
    }


    onAddButtonClick = e => {
        e.preventDefault(); 
        if(this.state.todo !== ''){
            this.props.addTodo(this.state.todo);
            this.setEmpty(false);
            this.setState({ todo: '' });
        }
        else {
            this.setEmpty(true);
            this.inputRef.current.focus();
        }
    }

    showError(isError){
        return isError ? <ErrorMessage message="Please, enter a task!"/> : null;
    }

    setEmpty = flag => {
        this.setState({ showErrorField: flag })
    }

    render() {
        return (
            <div className="from-container">
                <form className="form-add">
                    <input 
                        className="form-add__input" 
                        type="text" value={this.state.todo} 
                        placeholder="Enter a task..."
                        onChange={ e => this.setState({todo: e.target.value}) } 
                        ref={this.inputRef}
                    />
                    <button 
                        className="form-add__button"
                        onClick={ this.onAddButtonClick }
                    >
                        Add Task
                    </button>
                </form>
                <div className="error-message error-message-1">
                    {this.showError(this.state.showErrorField)}
                </div>
            </div>
        );
    }
}

export default AddTodo;