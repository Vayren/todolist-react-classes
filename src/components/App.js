import React from 'react';
import uniqid from 'uniqid';

import AddTodo from './AddTodo'
import TodoList from './TodoList';

class App extends React.Component {

    state = { 
        todoList: this.restoreDate()
    };
    
    restoreDate() {
        return JSON.parse(localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : [];
    }

    persistData(){
        localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
    }

    getDate() {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const now = new Date();

        return `${days[now.getDay()]}, ${month[now.getMonth()]} ${now.getDate()}`;
    }

    addTodo = title =>  {
        const newTodo = { id: uniqid(), title, status: true };
        this.setState({ todoList: [...this.state.todoList, newTodo]});
    }

    deleteTodo = id => {
        this.setState({ todoList: this.state.todoList.filter( item => item.id !== id) });
    }

    updateTodo = (id, title) => {
        this.setState({ todoList: [...this.state.todoList.map( item => {
            if(item.id === id) item.title = title;
            return item;
        })]});
    }

    toggleTodo = id => {
        this.setState({ todoList: this.state.todoList.map( item => {
            if(item.id === id) item.status = !item.status;
            return item;
        }) });
    }


    renderTodo() {
        return this.state.todoList.length ? 
        <TodoList 
            todoList={ this.state.todoList } 
            deleteTodo={ this.deleteTodo } 
            toggleTodo={ this.toggleTodo }
            updateTodo={ this.updateTodo }
        /> : <p className="mt-md">No tasks</p>;
    }

    render() {
        this.persistData();
        return (
            <div className="container">
                <div className="header">
                    <div className="header__details">
                        <h2 className="heading-2">{this.getDate()}</h2>
                        <p className="header__activities">{`${this.state.todoList.filter( item => item.status).length} Active Tasks`}</p> 
                    </div>
                </div>
                <AddTodo addTodo={ this.addTodo } />
                {this.renderTodo()}
            </div>  
        )
    }
};

export default App;