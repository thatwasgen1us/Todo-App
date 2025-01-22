import { Component } from "react";

export default class NewTaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newItem: ''
    };
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter' && this.state.newItem.trim()) {
      if (this.props.addItem) {
        this.props.addItem(this.state.newItem);
      } else {
        console.error("addItem function is not provided");
      }
      this.setState({ newItem: '' });
    } else if (event.key === 'Escape') {
      this.setState({ newItem: '' });
    }
  };

  handleChange = (event) => {
    this.setState({ newItem: event.target.value });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.newItem}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
      </header>
    );
  }
}
