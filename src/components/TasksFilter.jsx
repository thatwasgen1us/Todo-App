import { Component } from "react"

export default class TasksFilter extends Component {

  render () {
	const {setFilter, filter} = this.props

	return (
		<ul className="filters">
      <li>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : null}>All</button>
      </li>
      <li>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'selected' : null}>Active</button>
      </li>
      <li>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'selected' : null}>Completed</button>
      </li>
    </ul>
  )}
}

