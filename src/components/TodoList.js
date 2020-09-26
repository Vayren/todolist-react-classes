import React from 'react';

import TodoItem from './TodoItem';

class TodoList extends React.Component {

    renderList = list => {
        return list.map((item, index) => {
            return (
                < TodoItem
                    itemId={item.id}
                    checked={item.status}
                    toggleTodo={this.props.toggleTodo}
                    deleteTodo={this.props.deleteTodo}
                    updateTodo={this.props.updateTodo}
                    priority={item.priority}
                    title={item.title}
                    key={item.id}
                    index={index}
                    dnd={this.props.dnd}
                />
            );
        });
    }

    render() {
        return (
            <div
                className="list"
                ref={this.props.provided.innerRef}
                {...this.props.provided.droppableProps}
            >
                {this.renderList(this.props.todoList)}
                {this.props.provided.placeholder}
            </div>
        );
    }
}


export default TodoList;