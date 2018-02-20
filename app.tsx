import * as React from 'react'
import TodoList, { TodoItem } from './modules/todolist'
import './app.css'

const App = () => {
  let items: Array<TodoItem> = [{
    text: 'do homework',
    status: 0
  }, {
    text: 'eat lunch',
    status: 1
  }];

  return (
    <TodoList items={items}></TodoList>
  )
}

export default App;
