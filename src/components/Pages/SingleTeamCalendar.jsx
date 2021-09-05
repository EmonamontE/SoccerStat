import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation
} from "react-router-dom"
import axios from "axios";
import moment from "moment";
import CalendarOfMatches from "../for calendars/CalendarOfMatches";
import CalendarFilter from "../filters/CalendarFilter";

function SingleTeamCalendar(props) {
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const beginParam = params.has('begin') ? params.get('begin') : '';
  const endParam = params.has('end') ? params.get('end') : '';

  const [teamName, setTeamName] = useState('');
  const [teamCalendarState, setTeamCalendarState] = useState({
    calendar: [],
    error: ''
  });
  const [filterStartDate, setFilterStartDate] = useState(beginParam);
  const [filterEndDate, setFilterEndDate] = useState(endParam);
  const teamID = parseInt(props.match.params.teamID, 10);

  const updateFilter = (paramName, value) => {
    params.set(paramName, value);
    history.push({
      pathname: `/teams/${teamID}`,
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
      url: `http://api.football-data.org/v2/teams/${teamID}`
    })
      .then(function(response) {
        setTeamName(response.data.name);
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
        setTeamCalendarState({ calendar: result });
      })
      .catch(function (error) {
        setTeamCalendarState({ error: error });
      });
  }, [teamID]);

  return(
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">Календарь матчей клуба {teamName}</h1>
      <CalendarFilter
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        onFilterStartDateChange={setStartDateFilter}
        onFilterEndDateChange={setEndDateFilter}
      />
      <CalendarOfMatches
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        matches={teamCalendarState.calendar}
        error={teamCalendarState.error}
      />
    </div>
  );
}

export default SingleTeamCalendar;
