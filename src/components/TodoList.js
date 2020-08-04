import React from 'react';

import TodoItem from './TodoItem';
//<textarea rows="1">{item.title}</textarea>  
//<span className={`list__item-text ${item.status ? '' : 'line-through'}`} >{item.title}</span> 

const TodoList = ({ todoList, deleteTodo, toggleTodo, updateTodo }) => {

    const renderList = list => {
        return list.map( item => {
            return (
            < TodoItem 
                itemId={item.id} 
                checked={item.status} 
                toggleTodo={toggleTodo} 
                deleteTodo={deleteTodo} 
                updateTodo={updateTodo}
                title={item.title} 
                key={item.id}
            />
            );
        });
    };

    return (
        <div className="list">
           {renderList(todoList)}
        </div>
    );
};

export default TodoList;