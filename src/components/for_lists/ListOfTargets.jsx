import React from "react";
import {
  Link
} from "react-router-dom";
import TenRequestsError from "../errors/TenRequestsError";

// Компонент с данными о лиге для формирования списка
function RowOfLeague(props) {
  const league = props.league;
  return (
    <Link to={`/leagues/${league.id}`}>
      <li className="list-group-item">
        <p className="fs-4">{league.name} / {league.country}</p>
      </li>
    </Link>
  );
}

// Компонент с данными о команде для формирования списка
function RowOfTeam(props) {
  const team = props.team;
  return(
    <Link to={`/teams/${team.id}`}>
      <li className="list-group-item">
        <p className="pt-3 fs-4">
          <img
            src={team.pic}
            height="45px"
            width="45px"
            className="me-1"
            alt="team_logo"
          />
          {team.name} / {team.country}
        </p>
      </li>
    </Link>
  );
}

// Компонент, который в зависимости от пропса target
// формирует либо список лиг, либо список команд
export default function ListOfTargets(props) {
  let arrayOfData;
  const target = props.target;
  const filterText = props.filterText;
  const error = props.error;
  let rows = [];

  if (error) {
    return <TenRequestsError/>;
  }

  if (target === 'leagues') {
    arrayOfData = props.leagues;
  } else {
    arrayOfData = props.teams;
  }

  if (!filterText) {
    rows = arrayOfData;
  } else {
    rows = arrayOfData.filter((object) => object.name.indexOf(filterText) > -1);
  }

  if (target === 'leagues') {
    return (
      <ul className="list-group">
        {rows.map((league) => (
          <RowOfLeague
            league={league}
            key={league.id}
          />
        ))}
      </ul>
    );
  }

  return (
    <ul className="list-group">
      {rows.map((team) => (
        <RowOfTeam
          team={team}
          key={team.id}
        />
      ))}
    </ul>
  );
}
