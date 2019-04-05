export default class SwapiService {
  _baseUrl = 'https://swapi.co/api';
  _baseImage = 'https://starwars-visualguide.com/assets/img';

  async getResource(url) {
    const res = await fetch(`${this._baseUrl}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }

  getImagePerson = ({id}) => {
    return `${this._baseImage}/characters/${id}.jpg`;
  };

  getImageStarship = ({id}) => {
    return `${this._baseImage}/starships/${id}.jpg`;
  };

  getImagePlanet = ({id}) => {
    return `${this._baseImage}/planets/${id}.jpg`;
  };

  getAllPeople = async () => {
    const res = await this.getResource('/people/');
    return res.results.map(this._transformPerson);
  };

  getPerson = async id => {
    const person = await this.getResource(`/people/${id}`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource('/planets/');
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async id => {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    const res = await this.getResource('/starships/');
    return res.results.map(this._transformStarship);
  };

  getStarship = async id => {
    const starship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(starship);
  };

  _getId = item => {
    const idRegexp = /\/(\d+)\/$/;
    return item.url.match(idRegexp)[1];
  };

  _transformPlanet = planet => {
    return {
      id: this._getId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  };

  _transformPerson = person => {
    return {
      id: this._getId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  };

  _transformStarship = starship => {
    return {
      id: this._getId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  };
}
