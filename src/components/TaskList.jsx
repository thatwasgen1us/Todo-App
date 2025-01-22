import { Component } from "react"
import Task from "./Task"

export default class TaskList extends Component {

  render () {
    const { data, onDeleted, onToggleDone, done, onEditing, onEditChange } = this.props
    return (
      <ul className="todo-list">
       <Task data={data} onDeleted={onDeleted} onToggleDone={onToggleDone} done={done} onEditing={onEditing} onEditChange={onEditChange}/>
    </ul>
    )
  }

}


