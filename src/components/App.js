import React from 'react';
import uniqid from 'uniqid';
import _ from 'lodash';

import AddTodo from './AddTodo'
import TodoList from './TodoList';

class App extends React.Component {

    state = {
        todoList: this.restoreList(),
        todoOrder: this.restoreOrder(),
        buttons: {
            all: true,
            active: false,
            completed: false
        }
    };

    restoreList() {
        return JSON.parse(localStorage.getItem('todoList')) || {};
    }

    restoreOrder() {
        return JSON.parse(localStorage.getItem('todoOrder')) || [];
    }

    persistList() {
        localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
    }

    persistOrder() {
        localStorage.setItem('todoOrder', JSON.stringify(this.state.todoOrder));
    }

    getDate() {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const now = new Date();

        return `${days[now.getDay()]}, ${month[now.getMonth()]} ${now.getDate()}`;
    }

    addTodo = (title, priority) => {
        const id = uniqid();
        const newTodo = [{ id, title, status: true, priority }];

        this.setState(
            {
                todoList: { ...this.state.todoList, ..._.mapKeys(newTodo, 'id') },
                todoOrder: [...this.state.todoOrder, id]
            }
        );
    }

    deleteTodo = id => {
        this.setState(
            {
                todoList: _.omit(this.state.todoList, id),
                todoOrder: this.state.todoOrder.filter(itemId => itemId !== id)
            });
    }

    updateTodo = (id, title, priority) => {
        const updatedTodo = this.state.todoList[id];
        updatedTodo.title = title;
        updatedTodo.priority = priority;

        this.setState({ todoList: { ...this.state.todoList, [id]: updatedTodo } });
    }

    toggleTodo = id => {
        const toggledTodo = this.state.todoList[id];
        toggledTodo.status = !toggledTodo.status;

        this.setState({ todoList: { ...this.state.todoList, [id]: toggledTodo } });
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
        if (_.size(this.state.todoList)) {

            //render all tasks
            if (this.state.buttons.all) {
                return this.renderSelectedTodo(Object.values(this.state.todoList));
            }

            //render active tasks
            else if (this.state.buttons.active) {
                const activeTasks = Object.values(this.state.todoList).filter(todo => todo.status);

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
                const completedTasks = Object.values(this.state.todoList).filter(todo => !todo.status);

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

    getActiveTasks = () => {
        return Object.values(this.state.todoList).filter(item => item.status).length;
    }

    render() {
        this.persistList();
        this.restoreOrder();
        return (
            <div className="app-container">
                <div className="header">
                    <h2 className="header__date">{this.getDate()}</h2>
                    <p className="header__activities">{this.getActiveTasks()} Active Tasks</p>
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