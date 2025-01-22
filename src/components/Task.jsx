import { Component } from "react";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 5000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  formatTimeDifference(date) {
    const secondsDiff = Math.floor((this.state.currentTime - date) / 1000);

    if (secondsDiff < 0) {
      return '0 seconds ago';
    }

    if (secondsDiff < 60) {
      return `${secondsDiff} second${secondsDiff !== 1 ? 's' : ''} ago`;
    }

    const minutesDiff = Math.floor(secondsDiff / 60);
    if (minutesDiff < 60) {
      return `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''} ago`;
    }

    const hoursDiff = Math.floor(minutesDiff / 60);
    return `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''} ago`;
  }

  handleDeleteTask = (id) => {
    this.props.onDeleted(id);
    if (this.props.data.length === 1) {
      this.stopTimer();
    }
  };

  render() {
    const { data, onDeleted, onToggleDone, onEditing, onEditChange } = this.props;

    return (
      <>
        {data.map(el => {
          const timeAgo = this.formatTimeDifference(new Date(el.createdAt));

          return (
            <li key={el.id} className={`${el.done ? 'completed' : ''} ${el.editing ? 'editing' : ''}`}>
              <div className="view" onClick={() => onToggleDone(el.id)}>
                <input
                  className="toggle"
                  type="checkbox"
                  onChange={() => onToggleDone(el.id)}
                  checked={el.done}
                />
                <label>
                  <span className="description">{el.title}</span>
                  <span className="created">created {timeAgo}</span>
                </label>
                <button className="icon icon-edit" onClick={() => onEditing(el.id)}></button>
                <button className="icon icon-destroy" onClick={() => this.handleDeleteTask(el.id)}></button>
                <input className={el.input} type="checkbox" />
              </div>
              {el.editing ? (
                <input
                  type="text"
                  className="edit"
                  value={el.title}
                  onChange={(e) => this.props.onEditChange(el.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onEditing(el.id);
                    }
                  }}
                />
              ) : null}
            </li>
          );
        })}
      </>
    );
  }
}
