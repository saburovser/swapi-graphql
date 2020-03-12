const { gql } = require('apollo-server');

const typeDefs = gql`
    type Character {
        name: String
        height: Int
        mass: Int
        hair_color: String
        skin_color: String
        eye_color: String
        birth_year: String
        gender: String
        homeworld: Planet
        films: [Film]
        species: [Specie]
        #        vehicles: [Vehicle]
        #        starships: [Starship]
        created: Date
        edited: Date
    }

    type Planet {
        name: String
        rotation_period: Int
        orbital_period: Int
        diameter: Int
        climate: StringArray
        gravity: StringArray
        terrain: StringArray
        surface_water: Int
        population: Int
        residents: [Character]
        films: [Film]
        created: Date
        edited: Date
    }

    type Film {
        title: String
        episode_id: Int
        opening_crawl: String
        director: String
        producer: StringArray
        characters: [Character]
        planets: [Planet]
        #        starships: [Starship]
        #        vehicles: [Vehicle]
        species: [Specie]
        created: Date
        edited: Date
        url: String
    }

    type Specie {
        name: String
        classification: String
        designation: String
        average_height: Int
        skin_colors: StringArray
        hair_colors: StringArray
        eye_colors: StringArray
        average_lifespan: Int
        homeworld: Planet
        language: String
        people: [Character]
        films: [Film]
        created: Date
        edited: Date
        url: String
    }

    type Vehicle {
        name: String
        model: String
        manufacturer: String
        cost_in_credits: Int
        length: Float
        max_atmosphering_speed: String
        crew: Int
        passengers: Int
        cargo_capacity: Int
        consumables: String
        vehicle_class: String
        pilots: [Character]
        films: [Film]
        created: Date
        edited: Date
        url: String
    }

    #    type Starship {
    #        
    #    }

    type Query {
        character(id: ID!): Character

        planet(id: ID!): Planet

        #        starship(id: ID!): Starship

        vehicle(id: ID!): Vehicle
        vehicles(count: Int!, offset: Int): [Vehicle]

        film(id: ID!): Film

        specie(id: ID!): Specie
    }

    scalar StringArray
    scalar Date
`;

module.exports = typeDefs;
