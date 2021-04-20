import {PokemonRepository} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function givenEmptyDatabase() {
  await new PokemonRepository(testdb).deleteAll();
}
