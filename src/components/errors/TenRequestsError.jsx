import React from "react";

// Компонент с ошибкой о превышении количества запросов.
// Рендерится на страницах со списками
export default function TenRequestsError() {
  return(
    <div className="bg-dark text-danger text-center">
      <h1>Network Error</h1>
      <p className="fs-3">Превышено количество обращений к серверу</p>
      <p className="fs-3">Не более 10 в минуту</p>
    </div>
  );
}
