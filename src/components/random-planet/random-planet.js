import React, {Component} from 'react';

import SwapiService from '../../services/SwapiService';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: false,
    error: false
  };

  constructor() {
    super();
    this.updatePlanet();
    setInterval(this.updatePlanet, 10 * 1000)
  }

  onLoadPlanet = planet => {
    this.setState(
      {
        planet,
        loading: true
      });
  };

  onError = () => {
    this.setState({
      error: true
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 19) + 2;
    this.swapiService.getPlanet(id)
      .then(this.onLoadPlanet)
      .catch(this.onError);
  };

  render() {
    const {planet, loading, error} = this.state;

    let content = loading ? <PlanetView planet={planet}/> : <Spinner/>;
    content = error ? <ErrorIndicator/> : content;

    return (
      <div className="random-planet jumbotron rounded">
        {content}
      </div>
    );
  }
}

const PlanetView = ({planet}) => {
  const {id, name, population, rotationPeriod, diameter} = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt=""/>
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

