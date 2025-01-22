import { Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';

export default class App extends Component {
  state = {
    data: [
      { id: 1, title: 'Completed task', input: 'toggle', className: '', done: true, editing: false, createdAt: new Date() },
      { id: 2, title: 'Editing task', input: 'toggle', className: '', done: false, editing: true, createdAt: new Date() },
      { id: 3, title: 'Active task', input: 'toggle', className: '', done: false, editing: false, createdAt: new Date() },
    ],
    filter: 'all'
  }

  deleteItem = (id) => {
    this.setState(({ data }) => ({
      data: data.filter(el => el.id !== id)
    }));
  }

  addItem = (text, done = false) => {
    if (!text.trim()) return;
    this.setState(({ data }) => {
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      return {
        data: [
          ...data,
          {
            id: newId,
            title: text,
            className: '',
            input: 'toggle',
            done: done,
            editing: false,
            createdAt: new Date()
          }
        ]
      };
    });
  }

  onToggleDone = (id) => {
    this.setState(({ data }) => ({
      data: data.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    }));
  }

  clearCompleted = () => {
    this.setState(({data}) => ({
      data: data.filter(el => el.done === false)
    }))
  }

  onEditing = (id) => {
    this.setState(({ data }) => ({
      data: data.map(item =>
        item.id === id ? { ...item, editing: !item.editing } : item
      )
    }));
  }

  onEditChange = (id, newTitle) => {
    this.setState(({ data }) => {
      return {
        data: data.map(item =>
          item.id === id ? { ...item, title: newTitle, done: false } : item
        )
      };
    });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  getFilteredData = () => {
    const { data, filter } = this.state;
    switch (filter) {
      case 'active':
        return data.filter(task => !task.done);
      case 'completed':
        return data.filter(task => task.done);
      case 'all':
      default:
        return data;
    }
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList data={this.getFilteredData()} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} onEditing={this.onEditing} onEditChange={this.onEditChange}/>
        <section className="main">
          <Footer data={this.state.data} clearCompleted={this.clearCompleted} setFilter={this.setFilter} filter={this.state.filter}/>
        </section>
      </section>
    );
  }
}
