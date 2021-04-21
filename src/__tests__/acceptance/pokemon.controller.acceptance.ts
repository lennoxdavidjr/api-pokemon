import {Client, expect} from '@loopback/testlab';
import {ApiPokemonApplication} from '../..';
import {givenEmptyDatabase} from '../helpers/database.helpers';
import {setupApplication} from '../helpers/test-helper';

describe('PokemonController', () => {
  let app: ApiPokemonApplication;
  let client: Client;

  before(givenEmptyDatabase);
  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  describe('GET /pokemon/count', () => {
    it('retrieves the total number of Pokemon in the datastore', async () => {
      const res = await client.get('/pokemon/count').expect(200);
      expect(res.body.count).to.equal(151);
    });
  });

  describe('GET /pokemon', () => {
    it('retrieves all Pokemon in the datastore', async () => {
      const res = await client.get('/pokemon').expect(200);
      expect(res.body).to.have.length(151);
    });
  });

  describe('GET /pokemon/types', () => {
    it('retrieves a list of Pokemon types', async () => {
      const res = await client.get('/pokemon/types').expect(200);
      expect(res.body).to.eql([
        'Grass',
        'Poison',
        'Fire',
        'Flying',
        'Water',
        'Bug',
        'Normal',
        'Electric',
        'Ground',
        'Fairy',
        'Fighting',
        'Psychic',
        'Rock',
        'Steel',
        'Ice',
        'Ghost',
        'Dragon',
      ]);
    });
  });

  describe('GET and PATCH /pokemon/favorites', () => {
    it('marks a Pokemon as favorite or not', async () => {
      await client.patch('/pokemon/001/favorite?favorite=true').expect(204);
    });

    it('retrieves all favorite pokemon', async () => {
      const res = await client.get('/pokemon/favorites').expect(200);
      expect(res.body).to.eql([
        {
          id: '001',
          name: 'Bulbasaur',
          classification: 'Seed Pokémon',
          types: ['Grass', 'Poison'],
          resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
          weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
          weight: {
            minimum: '6.04kg',
            maximum: '7.76kg',
          },
          height: {
            minimum: '0.61m',
            maximum: '0.79m',
          },
          fleeRate: 0.1,
          evolutionRequirements: {
            amount: 25,
            name: 'Bulbasaur candies',
          },
          evolutions: [
            {
              id: 2,
              name: 'Ivysaur',
            },
            {
              id: 3,
              name: 'Venusaur',
            },
          ],
          maxCP: 951,
          maxHP: 1071,
          attacks: {
            fast: [
              {
                name: 'Tackle',
                type: 'Normal',
                damage: 12,
              },
              {
                name: 'Vine Whip',
                type: 'Grass',
                damage: 7,
              },
            ],
            special: [
              {
                name: 'Power Whip',
                type: 'Grass',
                damage: 70,
              },
              {
                name: 'Seed Bomb',
                type: 'Grass',
                damage: 40,
              },
              {
                name: 'Sludge Bomb',
                type: 'Poison',
                damage: 55,
              },
            ],
          },
          favorite: true,
        },
      ]);
    });

    it('returns an empty array if no favorites have been marked', async () => {
      await client.patch('/pokemon/001/favorite?favorite=false');
      const res = await client.get('/pokemon/favorites').expect(200);
      expect(res.body).to.eql([]);
    });
  });

  describe('GET /pokemon/{id}', () => {
    it('retrieves a Pokemon by id', async () => {
      const res = await client.get('/pokemon/077').expect(200);
      expect(res.body).to.eql({
        id: '077',
        name: 'Ponyta',
        classification: 'Fire Horse Pokémon',
        types: ['Fire'],
        resistant: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'],
        weaknesses: ['Water', 'Ground', 'Rock'],
        weight: {
          minimum: '26.25kg',
          maximum: '33.75kg',
        },
        height: {
          minimum: '0.88m',
          maximum: '1.13m',
        },
        fleeRate: 0.1,
        evolutionRequirements: {
          amount: 50,
          name: 'Ponyta candies',
        },
        evolutions: [
          {
            id: 78,
            name: 'Rapidash',
          },
        ],
        maxCP: 1370,
        maxHP: 1516,
        attacks: {
          fast: [
            {
              name: 'Ember',
              type: 'Fire',
              damage: 10,
            },
            {
              name: 'Tackle',
              type: 'Normal',
              damage: 12,
            },
          ],
          special: [
            {
              name: 'Fire Blast',
              type: 'Fire',
              damage: 100,
            },
            {
              name: 'Flame Charge',
              type: 'Fire',
              damage: 25,
            },
            {
              name: 'Flame Wheel',
              type: 'Fire',
              damage: 40,
            },
          ],
        },
        favorite: false,
      });
    });

    it('retrieves a Pokemon by id if leading zeroes are omitted or extra whitespace has been added', async () => {
      const res = await client.get('/pokemon/  1      ');
      expect(res.body).to.eql({
        id: '001',
        name: 'Bulbasaur',
        classification: 'Seed Pokémon',
        types: ['Grass', 'Poison'],
        resistant: ['Water', 'Electric', 'Grass', 'Fighting', 'Fairy'],
        weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic'],
        weight: {
          minimum: '6.04kg',
          maximum: '7.76kg',
        },
        height: {
          minimum: '0.61m',
          maximum: '0.79m',
        },
        fleeRate: 0.1,
        evolutionRequirements: {
          amount: 25,
          name: 'Bulbasaur candies',
        },
        evolutions: [
          {
            id: 2,
            name: 'Ivysaur',
          },
          {
            id: 3,
            name: 'Venusaur',
          },
        ],
        maxCP: 951,
        maxHP: 1071,
        attacks: {
          fast: [
            {
              name: 'Tackle',
              type: 'Normal',
              damage: 12,
            },
            {
              name: 'Vine Whip',
              type: 'Grass',
              damage: 7,
            },
          ],
          special: [
            {
              name: 'Power Whip',
              type: 'Grass',
              damage: 70,
            },
            {
              name: 'Seed Bomb',
              type: 'Grass',
              damage: 40,
            },
            {
              name: 'Sludge Bomb',
              type: 'Poison',
              damage: 55,
            },
          ],
        },
        favorite: false,
      });
    });
  });

  describe('GET /pokemon/name', () => {
    it('retrieves a Pokemon by name', async () => {
      const res = await client.get('/pokemon/name?name=Growlithe').expect(200);
      expect(res.body).to.eql({
        id: '058',
        name: 'Growlithe',
        classification: 'Puppy Pokémon',
        types: ['Fire'],
        resistant: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'],
        weaknesses: ['Water', 'Ground', 'Rock'],
        weight: {
          minimum: '16.63kg',
          maximum: '21.38kg',
        },
        height: {
          minimum: '0.61m',
          maximum: '0.79m',
        },
        fleeRate: 0.1,
        evolutionRequirements: {
          amount: 50,
          name: 'Growlithe candies',
        },
        evolutions: [
          {
            id: 59,
            name: 'Arcanine',
          },
        ],
        maxCP: 1199,
        maxHP: 1335,
        attacks: {
          fast: [
            {
              name: 'Bite',
              type: 'Dark',
              damage: 6,
            },
            {
              name: 'Ember',
              type: 'Fire',
              damage: 10,
            },
          ],
          special: [
            {
              name: 'Body Slam',
              type: 'Normal',
              damage: 40,
            },
            {
              name: 'Flame Wheel',
              type: 'Fire',
              damage: 40,
            },
            {
              name: 'Flamethrower',
              type: 'Fire',
              damage: 55,
            },
          ],
        },
        favorite: false,
      });
    });

    it('retrieves a Pokemon by name regardless of case, completeness, and whether or not the user includes additional whitespace', async () => {
      const res = await client
        .get('/pokemon/name?name=       squir')
        .expect(200);
      expect(res.body).to.eql({
        id: '007',
        name: 'Squirtle',
        classification: 'Tiny Turtle Pokémon',
        types: ['Water'],
        resistant: ['Fire', 'Water', 'Ice', 'Steel'],
        weaknesses: ['Electric', 'Grass'],
        weight: {
          minimum: '7.88kg',
          maximum: '10.13kg',
        },
        height: {
          minimum: '0.44m',
          maximum: '0.56m',
        },
        fleeRate: 0.1,
        evolutionRequirements: {
          amount: 25,
          name: 'Squirtle candies',
        },
        evolutions: [
          {
            id: 8,
            name: 'Wartortle',
          },
          {
            id: 9,
            name: 'Blastoise',
          },
        ],
        maxCP: 891,
        maxHP: 1008,
        attacks: {
          fast: [
            {
              name: 'Bubble',
              type: 'Water',
              damage: 25,
            },
            {
              name: 'Tackle',
              type: 'Normal',
              damage: 12,
            },
          ],
          special: [
            {
              name: 'Aqua Jet',
              type: 'Water',
              damage: 25,
            },
            {
              name: 'Aqua Tail',
              type: 'Water',
              damage: 45,
            },
            {
              name: 'Water Pulse',
              type: 'Water',
              damage: 35,
            },
          ],
        },
        favorite: false,
      });
    });
  });
});
