import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>404 - Страница не найдена</h2>
      <button onClick={() => navigate("/")}>Вернуться на главную</button>
    </div>
  );
};

export default NotFound;
