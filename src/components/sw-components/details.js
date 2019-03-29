import React from 'react';
import SwapiService from "../../services/swapi-service";
import ItemDetails, { Record } from "../item-details";

const swapiService = new SwapiService();

const {
  getPerson,
  getStarship,
  getPlanet,
  getImagePerson,
  getImagePlanet,
  getImageStarship
} = swapiService;

const PersonDetails = ({ itemId }) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={getPerson}
      getImageUrl={getImagePerson}>

      <Record field="gender" label="Gender"/>
      <Record field="birthYear" label="Birth Year"/>
      <Record field="eyeColor" label="Eye Color"/>

    </ItemDetails>
  );
};

const PlanetDetails = ({ itemId }) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={getPlanet}
      getImageUrl={getImagePlanet}>

      <Record field="name" label="Name"/>
      <Record field="population" label="Population"/>
      <Record field="rotationPeriod" label="Rotation Period"/>
      <Record field="diameter" label="Diameter"/>

    </ItemDetails>
  );
};

const StarshipDetails = ({ itemId }) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={getStarship}
      getImageUrl={getImageStarship}>

      <Record field="name" label="Name"/>
      <Record field="model" label="Model"/>
      <Record field="manufacturer" label="Manufacturer"/>
      <Record field="costInCredits" label="Cost"/>
      <Record field="length" label="Length"/>
      <Record field="crew" label="Crew"/>
      <Record field="passengers" label="Passengers"/>
      <Record field="cargoCapacity" label="Cargo Capacity"/>

    </ItemDetails>
  );
};

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
};