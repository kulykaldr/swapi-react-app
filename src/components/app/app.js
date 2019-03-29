import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from "../sw-components";

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    selectedItem: 6
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {

    const { showRandomPlanet, selectedItem } = this.state;
    const planet = showRandomPlanet ? <RandomPlanet/> : null;
    const peopleList = <PersonList />;
    const personDetails = <PersonDetails itemId={selectedItem}/>;

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header/>
          {planet}
          <div className="row mb2 button-row">
            <button
              className="toggle-planet btn btn-warning btn-lg"
              onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
            </button>
            <ErrorButton/>
          </div>

          <Row left={peopleList} right={personDetails}/>

        </div>
      </ErrorBoundry>
    );
  }
}
