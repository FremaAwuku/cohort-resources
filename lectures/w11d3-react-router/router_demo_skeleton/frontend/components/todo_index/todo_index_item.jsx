import React from 'react';
import merge from 'lodash/merge';

class TodoIndexItem extends React.Component {
  constructor(props) {
    super(props);
    // this.showDetail = this.showDetail.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  //showDetail method

  toggleTodo(e) {
    e.preventDefault();
    const toggledTodo = merge({}, this.props.todo, {
       done: !this.props.todo.done
     });
     this.props.updateTodo(toggledTodo);
  }

  render() {
    const { todo , updateTodo } = this.props;
    const { title, done } = todo;

    return (
      <li className="todo-list-item">
        <div className="todo-header">
          <h3><a onClick={this.showDetail}>{title}</a></h3>
          <button
            className={done ? "done" : "undone"}
            onClick={this.toggleTodo}>
            {done ? "Undo" : "Done"}
          </button>
        </div>
      </li>
    );
  }
}

export default TodoIndexItem;