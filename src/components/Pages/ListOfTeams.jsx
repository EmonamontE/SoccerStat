import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation
} from "react-router-dom"
import axios from "axios";
import ListOfTargets from "../for lists/ListOfTargets";
import FilterByNames from "../filters/FilterByNames";

function FilterableListOfTeams() {
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const filterParams = params.has('filter') ? params.get('filter') : '';

  const [listOfTeamsState, setListOfTeamsState] = useState({
    teams: [],
    error: ''
  });
  const [filterText, setFilterText] = useState(filterParams);

  const setSearchFilter = (value) => {
    const searchParams = new URLSearchParams({ filter: value });
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
        setListOfTeamsState({ teams: result});
      })
      .catch(function (error) {
        setListOfTeamsState({ error: error});
      });
  }, [setListOfTeamsState]);

  return(
    <div className="container">
      <h1 className="py-1 mb-4 text-center text-light bg-primary">Список команд</h1>
      <FilterByNames
        filterText={filterText}
        onFilterTextChange={setSearchFilter}
      />
      <ListOfTargets
        target="teams"
        teams={listOfTeamsState.teams}
        error={listOfTeamsState.error}
        filterText={filterText}
      />
    </div>
  );
}

export default FilterableListOfTeams;
