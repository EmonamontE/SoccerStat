import React, { useEffect, useState } from "react";
// import {
//   useHistory,
//   useLocation
// } from "react-router-dom"
import axios from "axios";
import moment from "moment";

function RowOfMatch(props) {
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

function ListOfMatches(props) {
  const error = props.error;
  const rows = [];

  if (error) {
    return(
      <div className="bg-dark text-danger text-center">
        <h1>Network Error</h1>
        <p className="fs-3">Превышено количество обращений к серверу</p>
        <p className="fs-3">Не более 10 в минуту</p>
      </div>
    );
  }

  props.matches.forEach((match) => {
    rows.push(
      <RowOfMatch
        match={match}
        key={match.id}
      />
    )
  });

  return (
    <div>
      <ul className="list-group">
        {rows}
      </ul>
    </div>
  );
}

function SingleTeamCalendar(props) {
  const [teamNameState, setTeamNameState] = useState('');
  const [gamesCalendarState, setGamesCalendarState] = useState([]);
  const [errorState, setErrorState] = useState('');
  const teamID = parseInt(props.match.params.teamID, 10);

  useEffect(() => {
    axios({
      method: 'GET',
      headers: { 'X-Auth-Token': `${process.env.REACT_APP_API_KEY}` },
      url: `http://api.football-data.org/v2/teams/${teamID}`
    })
      .then(function(response) {
        setTeamNameState(response.data.name);
      });

    axios({
      method: 'GET',
      headers: { 'X-Auth-Token': `${process.env.REACT_APP_API_KEY}` },
      url: `http://api.football-data.org/v2/teams/${teamID}/matches`
    })
      .then(function(response) {
        const result = response.data.matches.map((object) => {
          const correctDate = moment.utc(object.utcDate).format('DD.MM.YYYY');
          const resultData = {
            id: object.id,
            date: correctDate,
            homeTeam: object.homeTeam.name,
            awayTeam: object.awayTeam.name,
            score: {
              homeTeam: object.score.fullTime.homeTeam,
              awayTeam: object.score.fullTime.awayTeam,
            }
          };
          return resultData;
        });
        setGamesCalendarState(result);
      })
      .catch(function (error) {
        if (error) {
          const result = true;
          setErrorState(result);
        }
      });
  }, [teamID]);

  // useEffect(() => {

  // }, [teamID]);

  return(
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">Календарь матчей клуба {teamNameState}</h1>
      <ListOfMatches
        matches={gamesCalendarState}
        error={errorState}
      />
    </div>
  );
}

export default SingleTeamCalendar;
