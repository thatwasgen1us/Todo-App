import TasksFilter from "./TasksFilter"

const Footer = ({data, clearCompleted, setFilter, filter}) => {
    return (
      <footer className="footer">
          <span className="todo-count">{data.length - data.filter(el => el.done).length} items left</span>
          <TasksFilter filter={filter} setFilter={setFilter} />
          <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
    )
}

export default Footer

