import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div>
          <h1
            className="py-1 text-center text-light bg-primary"
          >
            Добро пожаловать на SoccerStat!
          </h1>
          <p className="fs-4">
            В данном приложении применяется API с бесплатным доступом.
            Количество запросов: 10 шт/мин.
            При достижении лимита приложение вернет ошибку.
          </p>
        </div>

        <br/>

        <div>
          <h2>Список лиг</h2>
          <p className="fs-4">
            Беслатный тарифный план дает доступ о данных только 12 лиг.
            Их список приведен чуть ниже. При выборе лиги Вам будет представлен календарь
            матчей текущего сезона. Попытка получить календарь любой другой лиги
            вернет ошибку.
          </p>
          <ul className="col-md-4 list-group fs-5">
            <li className="list-group-item">UEFA Champions League</li>
            <li className="list-group-item">Primeira Liga</li>
            <li className="list-group-item">Premier League</li>
            <li className="list-group-item">Eredivisie</li>
            <li className="list-group-item">Bundesliga</li>
            <li className="list-group-item">Ligue 1</li>
            <li className="list-group-item">Serie A</li>
            <li className="list-group-item">Primera Division</li>
            <li className="list-group-item">Championship</li>
            <li className="list-group-item">Campeonato Brasileiro Série A</li>
            <li className="list-group-item">FIFA World Cup</li>
            <li className="list-group-item">European Championship</li>
          </ul>
        </div>

        <br/>

        <h2>Список команд</h2>
      </div>
    );
  }
}

export default Home;
