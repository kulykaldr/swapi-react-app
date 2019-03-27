import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ItemDetails from '../person-details/item-details';

import './people-page.css';
import SwapiService from "../../services/swapi-service";
import Row from "../row";

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={item => `${item.name} (${item.gender}, ${item.birthYear})`}
      />
    );

    const personDetails = (
      <ItemDetails personId={this.state.selectedPerson}/>
    );

    return (
      <Row left={itemList} right={personDetails}/>
    );
  }
}
