import * as React from 'react'
import './index.css'

export interface TodoItem {
  text: string,
  status: 0 | 1,
  onChange?: () => void
}

const TodoListItem = ({ text, status, onChange }: TodoItem) => {
  return (
    <div className="">
      <input className="todolist__checkbox" type="checkbox" checked={status === 1} onChange={onChange} />
      <span className="todolist__text">{text}</span>
    </div>
  )
}

interface TodoListState {
  finished: Array<TodoItem>,
  unfinished: Array<TodoItem>
}

class TodoList extends React.Component<{ items: TodoItem[] }, TodoListState> {
  state = {
    finished: this.props.items.filter(item => item.status === 1),
    unfinished: this.props.items.filter(item => item.status === 0)
  }

  onChange(item: TodoItem) {
    let { finished, unfinished } = this.state;
    if (item.status === 1) {
      finished.splice(finished.indexOf(item), 1);
      item.status = 0;
      unfinished.splice(0, 0, item);
    } else {
      unfinished.splice(unfinished.indexOf(item), 1);
      item.status = 1;
      finished.splice(0, 0, item);
    }
    this.setState({
      finished,
      unfinished
    });
  }

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const target = event.currentTarget;
    setTimeout(() => {
      const value = target.value.trim();
      if (key === 'Enter' && value) {
        let unfinished = [...this.state.unfinished];
        unfinished.splice(0, 0, {
          text: value,
          status: 0
        });
        this.setState({
          unfinished
        });
        target.value = '';
      }
    }, 10);
  }

  render() {
    const { finished, unfinished } = this.state;
    return (
      <div className="todolist">
        <div className="todolist__new">
          <input className="todolist__input" type="text" placeholder="add something todo" onKeyPress={this.handleKeyPress} />
        </div>
        <ul className="todolist__unfinished">
          {
            unfinished.map((item, index) => (
              <li key={index} className="todolist__item">
                <TodoListItem {...item} onChange={this.onChange.bind(this, item)} />
              </li>
            ))
          }
        </ul>
        <ul className="todolist__finished">
          {
            finished.map((item, index) => (
              <li key={index} className="todolist__item">
                <TodoListItem {...item} onChange={this.onChange.bind(this, item)} />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default TodoList;
