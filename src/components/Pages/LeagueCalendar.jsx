import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation
} from "react-router-dom"
import axios from "axios";
import moment from "moment";
import CalendarOfMatches from "../for calendars/CalendarOfMatches";
import CalendarFilter from "../filters/CalendarFilter";

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
      <CalendarFilter
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        onFilterStartDateChange={setStartDateFilter}
        onFilterEndDateChange={setEndDateFilter}
      />
      <CalendarOfMatches
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        matches={leagueCalendarState.calendar}
        error={leagueCalendarState.error}
      />
    </div>
  );
}

export default FilterableLeagueCalendar;
