import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation
} from "react-router-dom"
import axios from "axios";
import moment from 'moment';
import RowOfMatch from "../RowOfMatch";

// Компонент со списком матчей
function ListOfMatches(props) {
  const error = props.error;
  const filterStartDate = props.filterStartDate;
  const filterEndDate = props.filterEndDate;
  const rows = [];

  if (error) {
    return (
      <div>
        <h2>Выбранная лига не доступна на текущем тарифе используемого API</h2>
        <p className="fs-3">
          Для выбора нового тарифного плана нажмите <a href="https://www.football-data.org/pricing" target="_blank" rel="noreferrer">сюда</a>
        </p>
      </div>
    );
  }

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
}

// Компонент со строкой поиска
function MatchSearchBar(props) {
  const startDateChangeHandler = (e) => {
    props.onFilterStartDateChange(e.target.value);
  }

  const endDateChangeHandler = (e) => {
    props.onFilterEndDateChange(e.target.value);
  }

  return(
    <form
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
      </div>
    </form>
  );
}

// Родительский компонент с состоянием
function FilterableLeagueCalendar(props) {
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const beginParam = params.has('begin') ? params.get('begin') : '';
  const endParam = params.has('end') ? params.get('end') : '';

  const [leagueName, setLeagueName] = useState('');
  const [leagueCalendarState, setLeagueCalendarState] = useState({
    calendar: [],
    error: ''
  });
  const [filterStartDate, setFilterStartDate] = useState(beginParam);
  const [filterEndDate, setFilterEndDate] = useState(endParam);
  const leagueID = parseInt(props.match.params.leagueID, 10);

  const updateFilter = (paramName, value) => {
    params.set(paramName, value);
    history.push({
      pathname: `/leagues/${leagueID}`,
      search: '?' + params
    });

    if (paramName === 'begin') {
      setFilterStartDate(value);
    }

    if (paramName === 'end') {
      setFilterEndDate(value);
    }
  }

  const setStartDateFilter = (value) => {
    updateFilter('begin', value);
  };

  const setEndDateFilter = (value) => {
    updateFilter('end', value);
  };

  useEffect(() => {
    axios({
      method: 'GET',
      headers: { 'X-Auth-Token': `${process.env.REACT_APP_API_KEY}` },
      url: `http://api.football-data.org/v2/competitions/${leagueID}/matches`
    })
      .then(function (response) {
        setLeagueName(response.data.competition.name);
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
        setLeagueCalendarState({ calendar: result });
      })
      .catch(function (error) {
        setLeagueCalendarState({ error: error });
      });
  }, [leagueID]);

  return(
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">{leagueName}</h1>
      <MatchSearchBar
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        onFilterStartDateChange={setStartDateFilter}
        onFilterEndDateChange={setEndDateFilter}
      />
      <ListOfMatches
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        matches={leagueCalendarState.calendar}
        error={leagueCalendarState.error}
      />
    </div>
  );
}

export default FilterableLeagueCalendar;
