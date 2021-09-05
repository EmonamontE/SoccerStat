import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation
} from "react-router-dom"
import axios from "axios";
import ListOfTargets from "../ListOfTargets";

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

  const [listOfLeaguesState, setListOfLeaguesState] = useState({
    leagues: [],
    error: ''
  });
  const [filterText, setFilterText] = useState(filterParams);

  const setSearchFilter = (value) => {
    const searchParams = new URLSearchParams({ filter: value });
    history.push({
      pathname: '/leagues',
      search: '?' + searchParams
    });
    setFilterText(value);
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
        setListOfLeaguesState({ leagues: result });
      })
      .catch(function (error) {
        setListOfLeaguesState({ error: error });
      });
  }, [setListOfLeaguesState]);

  return (
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">Список лиг</h1>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setSearchFilter}
      />
      <ListOfTargets
        target="leagues"
        error={listOfLeaguesState.error}
        leagues={listOfLeaguesState.leagues}
        filterText={filterText}
      />
    </div>
  );
}

export default FilterableListOfLeagues;
