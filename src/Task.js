import React from "react";

const Task = ({
  task,
  index,
  onToggleComplete,
  onDeleteTask,
  onEditStart,
  isEditing,
  editingTitle,
  editingDescription,
  handleEditingTitleChange,
  handleEditingDescriptionChange,
  onEditSave,
  onEditCancel,
}) => {
  const isCompleted = task.completed;

  const handleCheckboxChange = () => {
    if (!isEditing) {
      onToggleComplete(index);
    }
  };

  const handleEditStart = () => {
    if (!isCompleted) {
      onEditStart(index);
    }
  };

  return (
    <div className={`task-container ${isCompleted ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
        disabled={isEditing} // Disable checkbox if editing or completed
      />
      {isEditing ? (
        <div>
          <input
            value={editingTitle}
            onChange={handleEditingTitleChange}
            placeholder="Edit Title"
            disabled={isCompleted} // Disable input if task is completed
          />
          <input
            value={editingDescription}
            onChange={handleEditingDescriptionChange}
            placeholder="Edit Description"
            disabled={isCompleted} // Disable input if task is completed
          />
          <button onClick={onEditSave}>Сохранить</button>
          <button onClick={onEditCancel}>Отменить</button>
        </div>
      ) : (
        <div>
          <div className="task-title">{task.title}</div>
          <div className="task-description">{task.description}</div>
          <div className="task-created-time">{task.createdTime}</div>
        </div>
      )}
      <div className="edit-buttons">
        <button onClick={handleEditStart} disabled={isCompleted}>
          Редактировать
        </button>
        <button onClick={() => onDeleteTask(index)}>Удалить</button>
      </div>
    </div>
  );
};

export default Task;
