const { dateScalarType, stringArrayScalarType } = require('./customScalarTypes');
const {
  CHARACTER_API,
  FILM_API,
  PLANET_API,
  SPECIE_API,
  VEHICLE_API,
  STARSHIP_API
} = require('./api');
const {
  fetchAllEntities,
  fetchEntities,
  fetchEntityById
} = require('./helpers');

const parseIntResolver = (parent, args, context, info) => parseInt(parent[info.fieldName]);
const parseFloatResolver = (parent, args, context, info) => parseFloat(parent[info.fieldName]);

const resolvers = {
  Query: {
    character: (parent, args) => fetchEntityById(CHARACTER_API, args.id),

    planet: (parent, args) => fetchEntityById(PLANET_API, args.id),

    // starship: (parent, args) => fetchEntityById(STARSHIP_API, args.id),

    vehicle: (parent, args) => fetchEntityById(VEHICLE_API, args.id),
    vehicles: (parent, args) => fetchAllEntities(VEHICLE_API, args.count, args.offset),

    film: (parent, args) => fetchEntityById(FILM_API, args.id),

    specie: (parent, args) => fetchEntityById(SPECIE_API, args.id),
  },
  Character: {
    homeworld: async parent => fetch(parent.homeworld).then(data => data.json()),
    films: async parent => fetchEntities(parent.films).sort((film1, film2) => film1.episode_id - film2.episode_id),
    species: async parent => fetchEntities(parent.species),
  },
  Planet: {
    residents: async parent => fetchEntities(parent.residents),
    films: async parent => fetchEntities(parent.films),
  },
  Specie: {
    average_height: parent => parent.average_height !== 'n/a' ? parseInt(parent.average_height) : null,
    homeworld: async parent => parent.homeworld ? fetch(parent.homeworld).then(data => data.json()) : null,
  },
  Vehicle: {
    pilots: async parent => fetchEntities(parent.pilots),
    cargo_capacity: parseIntResolver,
    length: parseFloatResolver,
    cost_in_credits: parseIntResolver,
  },
  StringArray: stringArrayScalarType,
  Date: dateScalarType,
  // Planet: {
  //
  // }
};

module.exports = resolvers;
