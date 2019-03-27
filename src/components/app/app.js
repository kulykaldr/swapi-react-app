import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import ItemList from "../item-list";
import ItemDetails from "../person-details";
import Row from "../row";

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedItem: 5
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

    const { getPerson, getAllPeople, getImagePerson } = this.swapiService;

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const peopleList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={getAllPeople}
        renderItem={item => `${item.name} (${item.gender}, ${item.birthYear})`}
      />
    );

    const personDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={getPerson}
        getImageUrl={getImagePerson}
      />
    );

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

          <Row left={peopleList} right={personDetails} />

        </div>
      </ErrorBoundry>
    );
  }
}
