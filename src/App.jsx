import { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [data, setData] = useState([
    { id: 1, title: 'Completed task', input: 'toggle', className: '', done: true, editing: false, createdAt: new Date(), minutes: 0, seconds: 0 },
    { id: 2, title: 'Editing task', input: 'toggle', className: '', done: false, editing: true, createdAt: new Date(), minutes: 0, seconds: 0 },
    { id: 3, title: 'Active task', input: 'toggle', className: '', done: false, editing: false, createdAt: new Date(), minutes: 0, seconds: 0 },
  ]);
  const [filter, setFilter] = useState('all');

  const deleteItem = (id) => {
    setData(data.filter(el => el.id !== id))
  }

  const addItem = ({ title, seconds = 0, minutes = 0 }) => {
    if (!title.trim()) return;
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    setData([
      ...data,
      {
        id: newId,
        title: title,
        className: '',
        input: 'toggle',
        done: false,
        editing: false,
        createdAt: new Date(),
        minutes: minutes,
        seconds: seconds
      }
    ]);
  };

  const onToggleDone = (id) => {
    setData(data.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  const clearCompleted = () => {
    setData(data.filter(el => el.done === false)
    )}


  const onEditing = (id) => {
    setData(data.map(item =>
        item.id === id ? { ...item, editing: !item.editing } : item
      ))
  }


  const onEditChange = (id, newTitle) => {
    setData(data.map(item =>
          item.id === id ? { ...item, title: newTitle, done: false } : item
      ))
    };

  const getFilteredData = () => {
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

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList data={getFilteredData()} onDeleted={deleteItem} onToggleDone={onToggleDone} onEditing={onEditing} onEditChange={onEditChange}/>
      <section className="main">
        <Footer data={data} clearCompleted={clearCompleted} setFilter={setFilter} filter={filter}/>
      </section>
    </section>
  );
}
export default App
