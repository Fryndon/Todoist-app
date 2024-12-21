// import React from "react";
// import ReactDOM from "react-dom";
// import TaskList from "./TaskList";
// import AddTaskForm from "./AddTaskForm";
// import "./App.css";
// import { v4 as uuidv4 } from "uuid";

// class TodoApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tasks: [],
//       searchQuery: "",
//       editingIndex: null,
//       editingTitle: "",
//       editingDescription: "",
//     };
//   }

//   handleAddTask = (newTask) => {
//     this.setState((prevState) => ({
//       tasks: [
//         { ...newTask, id: uuidv4(), createdTime: new Date().toLocaleString() },
//         ...prevState.tasks,
//       ],
//     }));
//   };

//   handleToggleComplete = (index) => {
//     this.setState((prevState) => {
//       const tasks = [...prevState.tasks];
//       const taskToToggle = tasks[index];

//       tasks.splice(index, 1);
//       const newIndex = taskToToggle.completed ? 0 : tasks.length;
//       tasks.splice(newIndex, 0, {
//         ...taskToToggle,
//         completed: !taskToToggle.completed,
//       });

//       return { tasks };
//     });
//   };

//   handleDeleteTask = (index) => {
//     this.setState((prevState) => ({
//       tasks: prevState.tasks.filter((_, i) => i !== index),
//     }));
//   };

//   handleSearchChange = (event) => {
//     this.setState({ searchQuery: event.target.value });
//   };

//   handleEditStart = (index) => {
//     const taskToEdit = this.state.tasks[index];
//     this.setState({
//       editingIndex: index,
//       editingTitle: taskToEdit.title,
//       editingDescription: taskToEdit.description,
//     });
//   };

//   handleEditSave = () => {
//     const { editingIndex, editingTitle, editingDescription } = this.state;
//     this.setState((prevState) => {
//       const tasks = [...prevState.tasks];
//       tasks[editingIndex] = {
//         ...tasks[editingIndex],
//         title: editingTitle,
//         description: editingDescription,
//       };
//       return {
//         tasks,
//         editingIndex: null,
//         editingTitle: "",
//         editingDescription: "",
//       };
//     });
//   };

//   handleEditCancel = () => {
//     this.setState({
//       editingIndex: null,
//       editingTitle: "",
//       editingDescription: "",
//     });
//   };

//   render() {
//     const {
//       tasks,
//       searchQuery,
//       editingIndex,
//       editingTitle,
//       editingDescription,
//     } = this.state;

//     const filteredTasks = tasks.filter((task) => {
//       const matchesSearch =
//         task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         task.description.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesSearch;
//     });

//     return (
//       <div>
//         <h1>TodoList</h1>
//         <AddTaskForm onAddTask={this.handleAddTask} />
//         <input
//           type="text"
//           className="search"
//           placeholder="Поиск..."
//           value={searchQuery}
//           onChange={this.handleSearchChange}
//         />
//         <TaskList
//           tasks={filteredTasks}
//           onToggleComplete={this.handleToggleComplete}
//           onDeleteTask={this.handleDeleteTask}
//           onEditStart={this.handleEditStart}
//           editingIndex={editingIndex}
//           editingTitle={editingTitle}
//           editingDescription={editingDescription}
//           onEditSave={this.handleEditSave}
//           onEditCancel={this.handleEditCancel}
//           handleEditingTitleChange={(event) =>
//             this.setState({ editingTitle: event.target.value })
//           }
//           handleEditingDescriptionChange={(event) =>
//             this.setState({ editingDescription: event.target.value })
//           }
//         />
//         {filteredTasks.length === 0 && (
//           <p className="no-results">По вашим критериям ничего не найдено.</p>
//         )}
//       </div>
//     );
//   }
// }

// ReactDOM.render(<TodoApp />, document.getElementById("root"));

// export default TodoApp;

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      editingIndex: null,
      editingTitle: "",
      editingDescription: "",
    };
  }

  handleAddTask = (newTask) => {
    const { currentUser } = this.props;
    if (currentUser) {
      const updatedTasks = [
        { ...newTask, id: uuidv4(), createdTime: new Date().toLocaleString() },
        ...currentUser.tasks,
      ];
      currentUser.tasks = updatedTasks; // Обновляем задачи текущего пользователя
      this.setState({}); // Это вызовет повторный рендер
    }
  };

  handleToggleComplete = (index) => {
    const { currentUser } = this.props;
    if (currentUser) {
      const tasks = [...currentUser.tasks];
      const taskToToggle = tasks[index];

      tasks.splice(index, 1);
      const newIndex = taskToToggle.completed ? 0 : tasks.length;
      tasks.splice(newIndex, 0, {
        ...taskToToggle,
        completed: !taskToToggle.completed,
      });

      currentUser.tasks = tasks; // Обновляем задачи текущего пользователя
      this.setState({}); // Это вызовет повторный рендер
    }
  };

  handleDeleteTask = (index) => {
    const { currentUser } = this.props;
    if (currentUser) {
      currentUser.tasks = currentUser.tasks.filter((_, i) => i !== index);
      this.setState({}); // Это вызовет повторный рендер
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleEditStart = (index) => {
    const { currentUser } = this.props;
    const taskToEdit = currentUser.tasks[index];
    this.setState({
      editingIndex: index,
      editingTitle: taskToEdit.title,
      editingDescription: taskToEdit.description,
    });
  };

  handleEditSave = () => {
    const { editingIndex, editingTitle, editingDescription } = this.state;
    const { currentUser } = this.props;

    if (currentUser) {
      const tasks = [...currentUser.tasks];
      tasks[editingIndex] = {
        ...tasks[editingIndex],
        title: editingTitle,
        description: editingDescription,
      };
      currentUser.tasks = tasks; // Обновляем задачи текущего пользователя
      this.setState({
        editingIndex: null,
        editingTitle: "",
        editingDescription: "",
      }); // Сбрасываем состояние редактирования
    }
  };

  handleEditCancel = () => {
    this.setState({
      editingIndex: null,
      editingTitle: "",
      editingDescription: "",
    });
  };

  render() {
    const { searchQuery, editingIndex, editingTitle, editingDescription } =
      this.state;
    const { currentUser } = this.props;

    const filteredTasks = currentUser
      ? currentUser.tasks.filter((task) => {
          const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesSearch;
        })
      : [];

    return (
      <div>
        <h1>TodoList</h1>
        <AddTaskForm onAddTask={this.handleAddTask} />
        <input
          type="text"
          className="search"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={this.handleSearchChange}
        />
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={this.handleToggleComplete}
          onDeleteTask={this.handleDeleteTask}
          onEditStart={this.handleEditStart}
          editingIndex={editingIndex}
          editingTitle={editingTitle}
          editingDescription={editingDescription}
          onEditSave={this.handleEditSave}
          onEditCancel={this.handleEditCancel}
          handleEditingTitleChange={(event) =>
            this.setState({ editingTitle: event.target.value })
          }
          handleEditingDescriptionChange={(event) =>
            this.setState({ editingDescription: event.target.value })
          }
        />
        {filteredTasks.length === 0 && (
          <p className="no-results">По вашим критериям ничего не найдено.</p>
        )}
      </div>
    );
  }
}

const App = () => {
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  const handleLogin = (username) => {
    const user = users.find((u) => u.username === username);
    if (user) {
      setCurrentUser(user);
    }
  };

  const handleRegister = (username, password) => {
    const newUser = { username, password, tasks: [] };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUser(newUser);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TodoApp currentUser={currentUser} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
