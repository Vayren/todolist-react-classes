import React, { createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import EditField from './EditField';

class TodoItem extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { isEdit: false };
        this.titleRef = createRef();
    }

    showEdit = () => {
        this.setState({ isEdit: true });
    }

    hideEdit = () => {
        this.setState({ isEdit: false })
    }

    render() {

        const { itemId, checked, title, toggleTodo, deleteTodo, updateTodo } = this.props;

        return (
            <div className="list__item" key={itemId}>
                <div className="list__item-title">
                    <label 
                        className={`btn btn-checked ${checked ? '' : 'checked'}`}
                        htmlFor="check"
                        onClick={() => toggleTodo(itemId)}
                    >
                        <FontAwesomeIcon icon={faCheckCircle} /> 
                    </label>
                    <input type="checkbox" id="check"/>

                    {this.state.isEdit ? 
                        <EditField value={title} id={itemId} updateTodo={updateTodo} hideEdit={this.hideEdit}/> :
                        <span className={`list__item-text ${checked ? '' : 'line-through'} ${this.state.isEdit ? 'unvisible' : '' }` } 
                            ref={this.titleRef}
                        >
                                {title}
                        </span> 
                    }
                    
                </div>
                <div className="btn-group">
                    <button className={`btn btn-edit ${this.state.isEdit ? 'unvisible' : '' }`} onClick={ this.showEdit }>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button className="btn btn-delete" onClick={() => deleteTodo(itemId)}>
                        <FontAwesomeIcon icon={faTrashAlt} />    
                    </button>
                </div>
            </div>
        );
    }

}

export default TodoItem;