import React, { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom"
import axios from "axios";

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

function ListOfLeagues(props) {
  const filterText = props.filterText;
  const error = props.error;
  let rows = [];

  if (error) {
    return(
      <div className="bg-dark text-danger text-center">
        <h1>Network Error</h1>
        <p className="fs-3">Превышено количество обращений к серверу</p>
        <p className="fs-3">Не более 10 в минуту</p>
      </div>
    );
  }

  if (!filterText) {
    // console.log(props.leagues);
    rows = props.leagues;
  } else {
    // console.log(props.leagues);
    rows = props.leagues.filter((league) => league.name.indexOf(filterText) > -1);
  }

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

function SearchBar(props) {
  const filterText = props.filterText;

  const handleFilterTextChange = (e) => {
    props.onFilterTextChange(e.target.value);
  }

  return(
    <form className="col-md-3 mb-4">
      <label className="form-label fs-3">Поиск по названию</label>
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="Введите название лиги"
        onChange={handleFilterTextChange}
        value={filterText}
      />
      <div className="form-text">Например: Premier League</div>
    </form>
  );
}

function FilterableListOfLeagues() {
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const filterParams = params.has('filter') ? params.get('filter') : '';

  // const [leaguesState, setLeaguesState] = useState([]);
  // const [errorState, setErrorState] = useState('');
  // const [filterText, setFilterText] = useState(filterParams);
  const [listOfLeaguesState, setListOfLeaguesState] = useState({
    leagues: [],
    error: '',
    filterText: filterParams
  });

  const setSearchFilter = (value) => {
    const searchParams = new URLSearchParams({ filter: value });
    history.push({
      pathname: '/leagues',
      search: '?' + searchParams
    });
    // setFilterText(value);
    setListOfLeaguesState({ filterText: value });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      headers: { 'X-Auth-Token': `${process.env.REACT_APP_API_KEY}` },
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
        // setLeaguesState(result);
        setListOfLeaguesState({ leagues: result });
      })
      .catch(function (error) {
        // setErrorState(result);
        setListOfLeaguesState({ error: error });
      });
  }, [setListOfLeaguesState]);

  return (
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">Список лиг</h1>
      <SearchBar
        filterText={listOfLeaguesState.filterText}
        onFilterTextChange={setSearchFilter}
      />
      <ListOfLeagues
        error={listOfLeaguesState.error}
        leagues={listOfLeaguesState.leagues}
        filterText={listOfLeaguesState.filterText}
      />
    </div>
  );
}

export default FilterableListOfLeagues;
