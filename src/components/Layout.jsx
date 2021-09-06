import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import Home from "./pages/Home";
import ListOfLeagues from "./pages/ListOfLeagues";
import ListOfTeams from "./pages/ListOfTeams";
import LeagueCalendar from "./pages/LeagueCalendar";
import SingleTeamCalendar from "./pages/SingleTeamCalendar";

function Layout() {
    return (
      <Router>
        <div className="container">
          <header
            className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
          >
            <Link
              to="/"
              className="mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
            >
              <span className="fs-3">SoccerStat</span>
            </Link>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link
                  to="/leagues"
                  className="nav-link active"
                >
                  Список лиг
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  to="/teams"
                  className="nav-link active"
                >
                  Список команд
                </Link>
              </li>
            </ul>
          </header>
          <main>
            <Switch>
              <Route
                exact path='/'
                component={ Home }
              />
              <Route
                exact path='/leagues'
                component={ ListOfLeagues }
              />
              <Route
                path='/leagues/:leagueID'
                component={ LeagueCalendar }
              />
              <Route
                exact path='/teams'
                component={ ListOfTeams }
              />
              <Route
                exact path='/teams/:teamID'
                component={ SingleTeamCalendar }
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
}

export default Layout;
