import React from 'react';

import TodoItem from './TodoItem';

class TodoList extends React.Component {

    renderList = list => {
        return list.map(item => {
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
                />
            );
        });
    }

    render() {
        return (
            <div className="list">
                {this.renderList(this.props.todoList)}
            </div>
        );
    }
}


export default TodoList;