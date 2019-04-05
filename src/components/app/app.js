import React, { Component } from 'react';

import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi-service';
import PeoplePage from '../pages/people-page';
import PlanetsPage from '../pages/planets-page';
import StarshipsPage from '../pages/starships-page';
import { StarshipDetails } from '../sw-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {

  swapiService = new SwapiService();

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <Router>
            <div className='stardb-app'>
              <Header/>
              <RandomPlanet/>
              <Switch>
                <Route path='/' render={() => <h2>Welcome to Swapi React App</h2>} exact/>
                <Route path='/people/:id?' component={PeoplePage}/>
                <Route path='/planets' component={PlanetsPage}/>
                <Route path='/starships' component={StarshipsPage} exact/>
                <Route path='/starships/:id'
                       render={({ match }) => {
                         const { id } = match.params;
                         return <StarshipDetails itemId={id}/>
                       }}/>
                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
