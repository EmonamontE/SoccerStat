import React, { useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom"
import axios from "axios";

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

function ListOfTeams(props) {
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
    rows = props.teams;
  } else {
    rows = props.teams.filter((team) => team.name.indexOf(filterText) > -1);
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

function FilterableListOfTeams() {
  const history = useHistory();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const filterParams = params.has('filter') ? params.get('filter') : '';

  const [teamsState, setTeamsState] = useState([]);
  const [errorState, setErrorState] = useState('');
  const [filterText, setFilterText] = useState(filterParams);

  const setSearchFilter = (value) => {
    const searchParams = new URLSearchParams({filter: value});
    history.push({
      pathname: '/teams',
      search: '?' + searchParams
    });
    setFilterText(value);
  }

  useEffect(() => {
    axios({
      method: 'GET',
      headers: { 'X-Auth-Token': `${process.env.REACT_APP_API_KEY}` },
      url: 'http://api.football-data.org/v2/teams'
    })
      .then(function (response) {
        const result = response.data.teams.map((team) => {
          const resultData = {
            id: team.id,
            pic: team.crestUrl,
            country: team.area.name,
            name: team.name
          };
          return resultData;
        });
        setTeamsState(result);
      })
      .catch(function (error) {
        if (error) {
          const result = true;
          setErrorState(result);
        }
      });
  }, [setTeamsState]);

  return(
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">Список команд</h1>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setSearchFilter}
      />
      <ListOfTeams
        teams={teamsState}
        error={errorState}
        filterText={filterText}
      />
    </div>
  );
}

export default FilterableListOfTeams;
