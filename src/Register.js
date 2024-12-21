import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика для регистрации пользователя в db.json
    onRegister(username, password);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Register;
