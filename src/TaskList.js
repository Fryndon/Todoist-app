import React from "react";
import Task from "./Task";

const TaskList = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditStart,
  editingIndex,
  editingTitle,
  editingDescription,
  onEditSave,
  onEditCancel,
  handleEditingTitleChange,
  handleEditingDescriptionChange,
}) => {
  const handleToggleComplete = (index) => {
    onToggleComplete(index);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditStart={onEditStart}
          isEditing={editingIndex === index}
          editingTitle={editingTitle}
          editingDescription={editingDescription}
          handleEditingTitleChange={handleEditingTitleChange}
          handleEditingDescriptionChange={handleEditingDescriptionChange}
          onEditSave={onEditSave}
          onEditCancel={onEditCancel}
        />
      ))}
    </div>
  );
};

export default TaskList;
