import React from 'react';

import ErrorMessage from './ErrorMessage';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            todo: '',
            isEmptyField: false
        };
        this.inputRef = React.createRef();
    }
    state = {todo: ''}

    componentDidMount() {
        this.inputRef.current.onblur = () => this.isEmpty(false);
    }

    onButtonClick = e => {
        e.preventDefault(); 
        if(this.state.todo !== ''){
            this.props.addTodo(this.state.todo);
            this.isEmpty(false);
            this.setState({ todo: '' });
        }
        else {
            this.isEmpty(true);
            this.inputRef.current.focus();
        }
    }

    
    showError(status){
        return status ? <ErrorMessage message="Please, enter a task!"/> : null;
    }

    isEmpty = flag => {
        this.setState({ isEmptyField: flag })
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
                        onClick={ this.onButtonClick }
                    >
                        Add Task
                    </button>
                </form>
                <div className="error-message error-message-1">
                    {this.showError(this.state.isEmptyField)}
                </div>
            </div>
        );
    }
}

export default AddTodo;