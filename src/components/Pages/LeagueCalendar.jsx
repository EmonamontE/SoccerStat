import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';

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
    score = <h1 className="text-secondary py-2">? : ?</h1>;
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
  const leagueName = props.leagueName;
  const error = props.error;

  if (!error) {
    const rows = [];
    props.matches.forEach((match) => {
      rows.push(
        <RowOfMatch
          match={match}
          key={match.id}
        />
      );
    });
    return (
      <div>
        <h1 className="text-center text-light bg-primary py-2">{leagueName}</h1>
        <ul className="list-group">
          {rows}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-center text-light bg-primary">{leagueName}</h1>
        <h2>Выбранная лига не доступна на текущем тарифе используемого API</h2>
        <p className="fs-3">
          Для выбора нового тарифного плана нажмите <a href="https://www.football-data.org/pricing" target="_blank" rel="noreferrer">сюда</a>
        </p>
      </div>
    );
  }
}

function LeagueCalendar(props) {
  const [calendarState, setCalendarState] = useState([]);
  const [errorState, setErrorState] = useState('');
  const leagueID = props.location.state.leagueID;
  const leagueName = props.location.state.leagueName;

  useEffect(() => {
    if (!calendarState.length) {
      axios({
        method: 'GET',
        headers: { 'X-Auth-Token': '2184eb2a881a4b80ba1e3286d359d9ee' },
        url: `http://api.football-data.org/v2/competitions/${leagueID}/matches`
      })
        .then(function (response) {
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
            // console.log(resultData);
            return resultData;
          });
          setCalendarState(result);
        })
        .catch(function (error) {
          if (error) {
            const result = true;
            setErrorState(result);
          }
        });
    }
  }, [calendarState]);

  return(
    <div className="container">
      <ListOfMatches
        leagueName={leagueName}
        matches={calendarState}
        error={errorState}
      />
    </div>
  );
}

export default LeagueCalendar;
