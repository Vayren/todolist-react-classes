import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faBookmark, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

import EditField from './EditField';

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isEdit: false };
    }

    showEdit = () => {
        this.setState({ isEdit: true });
    }

    hideEdit = () => {
        this.setState({ isEdit: false })
    }

    render() {

        const { itemId, checked, title, priority, toggleTodo, deleteTodo, updateTodo, index } = this.props;

        return (
            <Draggable draggableId={itemId} index={index}>
                {provided => (
                    <div
                        className="list__item"
                        key={itemId}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >

                        <div className="list__item-title">
                            <label
                                className={`btn btn-checked ${checked ? '' : 'checked'}`}
                                htmlFor="check"
                                onClick={() => toggleTodo(itemId)}
                            >
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </label>
                            <input type="checkbox" id="check" className="list__input-checkbox" />
                            <div className={`list__item-icon priority-icon--${priority}`}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                            {this.state.isEdit ?
                                <EditField value={title} id={itemId} updateTodo={updateTodo} hideEdit={this.hideEdit} priority={priority} /> :

                                <span className={`list__item-text ${checked ? '' : 'line-through'} ${this.state.isEdit ? 'unvisible' : ''}`} >
                                    {title}
                                </span>
                            }
                        </div>

                        <div className="list__item-toolbar">
                            <button className={`btn btn-edit ${this.state.isEdit ? 'unvisible' : ''}`} onClick={this.showEdit}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                            <button className={`btn btn-delete ${this.state.isEdit ? 'unvisible' : ''}`} onClick={() => deleteTodo(itemId)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                            <button
                                className={`btn btn-move ${this.state.isEdit || !this.props.dnd ? 'unvisible' : ''}`}
                                {...provided.dragHandleProps}
                            >
                                <FontAwesomeIcon icon={faGripLines} />
                            </button>

                        </div>

                    </div>
                )
                }
            </Draggable>
        );
    }

}

export default TodoItem;