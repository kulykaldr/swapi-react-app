import React, {Component} from 'react';

import SwapiService from '../../services/SwapiService';
import Spinner from '../spinner';
import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true
  };

  constructor() {
    super();
    this.updatePlanet();
  }

  async updatePlanet() {
    const id = Math.floor(Math.random() * 19) + 2;
    this.setState(
      {
        planet: await this.swapiService.getPlanet(id),
        loading: false
      }
    );
  }

  render() {
    const {planet, loading } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        {loading ? <Spinner /> :  <PlanetView planet={planet} />}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
};

