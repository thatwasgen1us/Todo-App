import { Component, useEffect, useState } from "react";
import Timer from "./Timer";

const Task = ({ data, onDeleted, onToggleDone, onEditing, onEditChange }) => {

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const startTimer = () => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 5000);

      return () => clearInterval(intervalId);
    };

    const intervalId = startTimer();
    return () => clearInterval(intervalId);
  }, []);

  const formatTimeDifference = (date) => {
    const secondsDiff = Math.floor((currentTime - date) / 1000);

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

  const handleDeleteTask = (id) => {
   onDeleted(id);
  };


  return (
    <>
      {data.map(el => {
        const timeAgo = formatTimeDifference(new Date(el.createdAt));

        return (
          <li key={el.id} className={`${el.done ? 'completed' : ''} ${el.editing ? 'editing' : ''}`}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={el.done}
                onChange={() => onToggleDone(el.id)}
              />
              <label>
                <span className="title" onClick={() => onToggleDone(el.id)}>{el.title}</span>
                <Timer minutes={el.minutes} seconds={el.seconds} />
                <span className="description">created {timeAgo}</span>
              </label>
              <button className="icon icon-edit" onClick={() => onEditing(el.id)}></button>
              <button className="icon icon-destroy" onClick={() => handleDeleteTask(el.id)}></button>
            </div>
            {el.editing && (
              <input
                type="text"
                className="edit"
                value={el.title}
                onChange={(e) => onEditChange(el.id, e.target.value)} // Обработчик изменения
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onEditing(el.id);
                  }
                }}
              />
            )}
          </li>
        );
      })}
    </>
  );
}

export default Task
