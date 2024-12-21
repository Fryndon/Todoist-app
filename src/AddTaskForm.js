import React from "react";

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskTitle: "",
      newTaskDescription: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { newTaskTitle, newTaskDescription, newTaskSeverity } = this.state;

    if (newTaskTitle.trim()) {
      this.props.onAddTask({
        title: newTaskTitle,
        description: newTaskDescription,
        severity: newTaskSeverity,
        completed: false,
        createdTime: new Date().toLocaleString(),
      });
      this.setState({
        newTaskTitle: "",
        newTaskDescription: "",
        newTaskSeverity: "low",
      });
    } else {
      alert("Title cannot be empty.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-task-container">
        <input
          type="text"
          placeholder="Task Title"
          value={this.state.newTaskTitle}
          onChange={(e) => this.setState({ newTaskTitle: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={this.state.newTaskDescription}
          onChange={(e) =>
            this.setState({ newTaskDescription: e.target.value })
          }
        />
        <button type="submit">Добавить задачу</button>
      </form>
    );
  }
}

export default AddTaskForm;
