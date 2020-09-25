import React from 'react';
import uniqid from 'uniqid';

import AddTodo from './AddTodo'
import TodoList from './TodoList';

class App extends React.Component {

    state = {
        todoList: this.restoreDate(),
        buttons: {
            all: true,
            active: false,
            completed: false
        }
    };

    restoreDate() {
        return JSON.parse(localStorage.getItem('todoList')) || [];
    }

    persistData() {
        localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
    }

    getDate() {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const now = new Date();

        return `${days[now.getDay()]}, ${month[now.getMonth()]} ${now.getDate()}`;
    }

    addTodo = (title, priority) => {
        const newTodo = { id: uniqid(), title, status: true, priority };
        this.setState({ todoList: [...this.state.todoList, newTodo] });
    }

    deleteTodo = id => {
        this.setState({ todoList: this.state.todoList.filter(item => item.id !== id) });
    }

    updateTodo = (id, title, priority) => {
        this.setState({
            todoList: [...this.state.todoList.map(item => {
                if (item.id === id) {
                    item.title = title;
                    item.priority = priority;
                }
                return item;
            })]
        });
    }

    toggleTodo = id => {
        this.setState({
            todoList: this.state.todoList.map(item => {
                if (item.id === id) item.status = !item.status;
                return item;
            })
        });
    }

    setAllTasks = () => {
        return this.setState({
            buttons: {
                all: true,
                active: false,
                completed: false
            }
        })
    }

    setActiveTasks = () => {
        return this.setState({
            buttons: {
                all: false,
                active: true,
                completed: false
            }
        })
    }

    setCompletedTasks = () => {
        return this.setState({
            buttons: {
                all: false,
                active: false,
                completed: true
            }
        })
    }

    renderSelectedTodo = todoList => {
        return (
            <TodoList
                todoList={todoList}
                deleteTodo={this.deleteTodo}
                toggleTodo={this.toggleTodo}
                updateTodo={this.updateTodo}
            />
        )
    }

    renderTodo() {
        if (this.state.todoList.length) {

            //render all tasks
            if (this.state.buttons.all) {
                return this.renderSelectedTodo(this.state.todoList);
            }

            //render active tasks
            else if (this.state.buttons.active) {
                const activeTasks = this.state.todoList.filter(todo => todo.status);

                if (activeTasks.length) {
                    return this.renderSelectedTodo(activeTasks);
                } else {
                    return (
                        <div className="empty-list">No active tasks</div>
                    )
                }
            }

            //render completed tasks
            else if (this.state.buttons.completed) {
                const completedTasks = this.state.todoList.filter(todo => !todo.status);

                if (completedTasks.length) {
                    return this.renderSelectedTodo(completedTasks);
                } else {
                    return (
                        <div className="empty-list">No completed tasks</div>
                    )
                }
            }
        } else {
            return (
                <div className="empty-list">No tasks</div>
            )
        }
    }

    render() {
        this.persistData();
        return (
            <div className="app-container">
                <div className="header">
                    <h2 className="header__date">{this.getDate()}</h2>
                    <p className="header__activities">{`${this.state.todoList.filter(item => item.status).length} Active Tasks`}</p>
                </div>
                <AddTodo addTodo={this.addTodo} />
                {this.renderTodo()}
                <div className="sort-btns">
                    <button className={`sort-btn sort-all ${this.state.buttons.all ? "active" : ''}`} onClick={() => this.setAllTasks()}>All</button>
                    <button className={`sort-btn sort-active ${this.state.buttons.active ? "active" : ''}`} onClick={() => this.setActiveTasks()}>Active</button>
                    <button className={`sort-btn sort-completed ${this.state.buttons.completed ? "active" : ''}`} onClick={() => this.setCompletedTasks()}>Completed</button>
                </div>
            </div>
        )
    }
};

export default App;