import React from "react";
import {
  Link
} from "react-router-dom";
import RequestError from "./RequestError";

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

export default function ListOfTargets(props) {
  let arrayOfData;
  const target = props.target;
  const filterText = props.filterText;
  const error = props.error;
  let rows = [];

  if (error) {
    return <RequestError/>;
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
  } else {
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
}
