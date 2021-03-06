import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation
} from "react-router-dom"
import axios from "axios";
import ListOfTargets from "../for_lists/ListOfTargets";
import FilterByNames from "../filters/FilterByNames";

// Список лиг
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
      <FilterByNames
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
