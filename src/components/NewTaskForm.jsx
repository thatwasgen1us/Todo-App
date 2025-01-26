import { Component } from "react";

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      newSeconds: '',
      newMinutes: '',
    };
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter' && this.state.newItem.trim()) {
      if (this.props.addItem) {
        this.props.addItem({
          title: this.state.newItem,
          minutes: parseInt(this.state.newMinutes) || 0,
          seconds: parseInt(this.state.newSeconds) || 0,
        });
      } else {
        console.error("addItem function is not provided");
      }
      this.setState({ newItem: '', newMinutes: '', newSeconds: '' });
    } else if (event.key === 'Escape') {
      this.setState({ newItem: '', newMinutes: '', newSeconds: '' });
    }
  };

  handleChangeItem = (event) => {
    this.setState({ newItem: event.target.value });
  };

  handleChangeMinutes = (event) => {
    this.setState({ newMinutes: event.target.value });
  };

  handleChangeSeconds = (event) => {
    this.setState({ newSeconds: event.target.value });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.newItem}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChangeItem}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.newMinutes}
            onChange={this.handleChangeMinutes}
            onKeyDown={this.handleKeyDown}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.newSeconds}
            onChange={this.handleChangeSeconds}
            onKeyDown={this.handleKeyDown}
          />
        </form>
      </header>
    );
  }
}
