import Task from "./Task"

const TaskList = ({ data, onDeleted, onToggleDone, done, onEditing, onEditChange }) => {
    return (
      <ul className="todo-list">
       <Task data={data} onDeleted={onDeleted} onToggleDone={onToggleDone} done={done} onEditing={onEditing} onEditChange={onEditChange}/>
    </ul>
    )
}

export default TaskList
