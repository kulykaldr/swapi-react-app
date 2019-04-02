import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from "../error-boundry";
import { SwapiServiceProvider } from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
import PeoplePage from "../pages/people-page";
import PlanetsPage from "../pages/planets-page";
import StarshipsPage from "../pages/starships-page";

export default class App extends Component {

  swapiService = new SwapiService();

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header/>
            <RandomPlanet/>

            <PeoplePage />
            <PlanetsPage />
            <StarshipsPage />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
