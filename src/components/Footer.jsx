import { Component } from "react"
import TasksFilter from "./TasksFilter"

export default class Footer extends Component{
  render () {
    const {data, clearCompleted, setFilter, filter} = this.props
    return (
      <footer className="footer">
          <span className="todo-count">{data.length - data.filter(el => el.done).length} items left</span>
          <TasksFilter filter={filter} setFilter={setFilter} />
          <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
    )
  }
}

