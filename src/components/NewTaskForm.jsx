import { useState } from "react";

const NewTaskForm = ({ addItem }) => {
  const [newItem, setNewItem] = useState('')
  const [newSeconds, setNewSeconds] = useState('')
  const [newMinutes, setNewMinutes] = useState('')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && newItem.trim()) {
      if (addItem) {
      addItem({
        title: newItem,
        minutes: parseInt(newSeconds) || 0,
        seconds: parseInt(newMinutes) || 0,
      })
      } else {
        console.error("addItem function is not provided");
      }
      setNewItem('')
      setNewMinutes('')
      setNewSeconds('');
    } else if (event.key === 'Escape') {
      setNewItem('')
      setNewMinutes('')
      setNewSeconds('');
    }
  };

  const handleChangeItem = (event) => {
  setNewItem(event.target.value);
  };

  const handleChangeMinutes = (event) => {
    setNewMinutes(event.target.value);
  };

  const handleChangeSeconds = (event) => {
    setNewSeconds(event.target.value);
  };

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newItem}
            onKeyDown={handleKeyDown}
            onChange={handleChangeItem}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            value={newMinutes}
            onChange={handleChangeMinutes}
            onKeyDown={handleKeyDown}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            value={newSeconds}
            onChange={handleChangeSeconds}
            onKeyDown={handleKeyDown}
          />
        </form>
      </header>
    );
}
export default NewTaskForm
