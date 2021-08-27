import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';

// Копмонент с матчем
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

// Компонент со списком матчей
function ListOfMatches(props) {
  const error = props.error;
  const filterStartDate = props.filterStartDate;
  const filterEndDate = props.filterEndDate;

  if (!error) {
    const rows = [];

    props.matches.forEach((match) => {
      if (filterStartDate && filterEndDate) {
        if (moment(filterStartDate, 'DD.MM.YYYY') > moment(match.date, 'DD.MM.YYYY')) {
          return;
        }
        if (moment(match.date, 'DD.MM.YYYY') > moment(filterEndDate, 'DD.MM.YYYY')) {
          return;
        }
      }
      rows.push(
        <RowOfMatch
          match={match}
          key={match.id}
        />
      );
    });

    return (
      <div>
        <ul className="list-group">
          {rows}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Выбранная лига не доступна на текущем тарифе используемого API</h2>
        <p className="fs-3">
          Для выбора нового тарифного плана нажмите <a href="https://www.football-data.org/pricing" target="_blank" rel="noreferrer">сюда</a>
        </p>
      </div>
    );
  }
}

// Компонент со строкой поиска
function MatchSearchBar(props) {
  const startDateChangeHandler = (e) => {
    props.onFilterStartDateChange(e.target.value);
    console.log(e.target.value);
  }

  const endDateChangeHandler = (e) => {
    props.onFilterEndDateChange(e.target.value);
    console.log(e.target.value);
  }

  // const mySubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log([props.filterStartDate, props.filterEndDate]);
  // }

  return(
    <form
      // onSubmit={mySubmitHandler}
      className="col-md-6 mb-4 d-flex flex-row"
    >
      <div className="col-md-4 input-group">
        <span className="input-group-text">С</span>
        <input
          type="text"
          name="startDate"
          value={props.filterStartDate}
          className="form-control"
          placeholder="этой даты"
          onInput={startDateChangeHandler}
        />
        <span className="input-group-text">по</span>
        <input
          type="text"
          name="endDate"
          value={props.filterEndDate}
          className="form-control"
          placeholder="эту дату"
          onInput={endDateChangeHandler}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
        >Поиск</button>
      </div>
    </form>
  );
}

// Родительский компонент с состоянием
function FilterableLeagueCalendar(props) {
  const [calendarState, setCalendarState] = useState([]);
  const [errorState, setErrorState] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
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
  }, [setCalendarState]);

  return(
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">{leagueName}</h1>
      <MatchSearchBar
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        onFilterStartDateChange={setFilterStartDate}
        onFilterEndDateChange={setFilterEndDate}
      />
      <ListOfMatches
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        matches={calendarState}
        error={errorState}
      />
    </div>
  );
}

export default FilterableLeagueCalendar;
