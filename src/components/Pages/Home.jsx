import React from "react";

// Стартовая страница
function Home() {
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
          При достижении лимита приложение возвращает ошибку.
        </p>
      </div>

      <br/>

      <div>
        <h2>Список лиг</h2>
        <p className="fs-4">
          Беслатный тарифный план дает доступ к данным о 12 лигах:
        </p>
        <ul className="col-md-4 mb-3 list-group fs-5">
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
        <p className="fs-4">
          Выбрав одну из вышеперечисленных лиг Вам будет представлен календарь
          текущего сезона. Попытка получить данные о любой другой лиге вернет
          ошибку. И не забудьте воспользоваться фильтром по названиям.
          Это бесплатно!
        </p>
      </div>

      <br/>

      <h2>Список команд</h2>
      <p className="fs-4 pb-6">
        Перед Вами список всех команд Английской премьер-лиги, принимающих
        участие в текущем сезоне! Воспользуйтесь фильтром, чтобы быстро найти
        интересующий Вас клуб и увидеть его календарь на сезон!
      </p>
    </div>
  );
}

export default Home;
