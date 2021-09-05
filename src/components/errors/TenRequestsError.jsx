import React from "react";

export default function TenRequestsError() {
  return(
    <div className="bg-dark text-danger text-center">
      <h1>Network Error</h1>
      <p className="fs-3">Превышено количество обращений к серверу</p>
      <p className="fs-3">Не более 10 в минуту</p>
    </div>
  );
}
