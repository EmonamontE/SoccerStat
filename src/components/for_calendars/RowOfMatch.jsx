import React from "react";

// Компонент с данными о матче.
// Формирует элемент для календаря.
export default function RowOfMatch(props) {
  const match = props.match;
  let score;
  let info;

  if (match.score.homeTeam !== null) {
    score = (
      <div>
        <h1>{match.score.homeTeam} : {match.score.awayTeam}</h1>
      </div>
    );
  } else {
    score = <h1 className="text-secondary">? : ?</h1>;
    info = <p className="text-secondary">Матч еще не состоялся</p>
  }

  return(
    <li className="list-group-item">
      <div className="col-md-12 text-center">{match.date}</div>
      <div className="d-flex flex-row">
        <div className="col-md-4 text-end">
          <p className="fs-3">{match.homeTeam}</p>
        </div>
        <div className="col-md-4 text-center">
          {score}
          {info}
        </div>
        <div className="col-md-4 text-start">
          <p className="fs-3">{match.awayTeam}</p>
        </div>
      </div>
    </li>
  );
}
