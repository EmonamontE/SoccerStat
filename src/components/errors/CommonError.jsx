import React from "react";

// Компонент с общей ошибкой,
// рендерится на страницах с календарями
export default function CommonError() {
  return(
    <div>
      <h2>Выбранная лига не доступна на текущем тарифе используемого API или превышено количество обращений к серверу</h2>
      <p className="fs-3">
      Для выбора нового тарифного плана нажмите <a href="https://www.football-data.org/pricing" target="_blank" rel="noreferrer">сюда</a>
      </p>
    </div>
  );
}
