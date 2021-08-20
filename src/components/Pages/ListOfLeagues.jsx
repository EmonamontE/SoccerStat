import React, { useEffect, useState } from "react";
import {
  Link
} from "react-router-dom"
import axios from "axios";

function RowOfLeague(props) {
  const league = props.league;
  return (
    <Link
      to={{
        pathname: "/leagues/calendar",
        state: {
          leagueName: league.name,
          leagueID: league.id
        }
      }}
    >
      <li className="list-group-item">
        <p className="fs-4">{league.name} / {league.country}</p>
      </li>
    </Link>
  );
}

function ListOfLeagues(props) {
  const filterText = props.filterText;
  const error = props.error;
  const rows = [];

  if (!error) {
    props.leagues.forEach((league) => {
      if (league.name.indexOf(filterText) === -1) {
        return;
      }
      rows.push(
        <RowOfLeague
          league={league}
          key={league.id}
        />
      );
    });

    return (
      <ul className="list-group">
        {rows}
      </ul>
    );
  } else {
    return (
      <div className="bg-dark text-danger text-center">
        <h1>Network Error</h1>
        <p className="fs-3">Превышено количество обращений к серверу</p>
        <p className="fs-3">Не более 10 в минуту</p>
      </div>
    );
  }
}

function SearchBar(props) {
  const handleFilterTextChange = (e) => {
    props.onFilterTextChange(e.target.value);
  }

  return(
    <form className="mb-4 p-2">
      <label className="form-label fs-3">Поиск по названию</label>
      <input
        className="form-control form-control-lg"
        type="search"
        placeholder="Введите название лиги"
        onChange={handleFilterTextChange}
        name="filter"
        // value={props.filterText}
      />
      <div className="form-text">Например: Premier League</div>
    </form>
  );
}

function FilterableListOfLeagues() {
  const [leaguesState, setLeaguesState] = useState([]);
  const [errorState, setErrorState] = useState('');
  const [filterText, setFilterText] = useState('');
  
  useEffect(() => {
    if (!leaguesState.length) {
      axios({
        method: 'GET',
        headers: { 'X-Auth-Token': '2184eb2a881a4b80ba1e3286d359d9ee' },
        url: 'http://api.football-data.org/v2/competitions'
      })
        .then(function (response) {
          const result = response.data.competitions.map((object) => {
            const resultData = {
              id: object.id,
              country: object.area.name,
              name: object.name
            };
            return resultData;
          });
          setLeaguesState(result);
        })
        .catch(function (error) {
          if (error) {
            const result = true;
            setErrorState(result);
          }
        });
    }
  }, [leaguesState]);

  return (
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">Список лиг</h1>
      <SearchBar
        leagues={leaguesState}
        filterText={filterText}
        onFilterTextChange={setFilterText}
      />
      <ListOfLeagues
        error={errorState}
        leagues={leaguesState}
        filterText={filterText}
      />
    </div>
  );
}

export default FilterableListOfLeagues;
