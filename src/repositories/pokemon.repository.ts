import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Pokemon, PokemonRelations} from '../models';

export class PokemonRepository extends DefaultCrudRepository<
  Pokemon,
  typeof Pokemon.prototype.id,
  PokemonRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Pokemon, dataSource);
  }

  findByName(name: string): Promise<(Pokemon & PokemonRelations) | null> {
    const pattern = new RegExp('.*' + name + '.*', 'i');
    return this.findOne({where: {name: {like: pattern}}});
  }

  async getTypes(): Promise<string[]> {
    const list = await this.find({
      fields: {
        types: true,
      },
    });
    const types = list.map(l => l.types).flat(1);

    return [...new Set(types)];
  }

  async getFavorites(): Promise<(Pokemon & PokemonRelations)[]> {
    return this.find({where: {favorite: true}});
  }
}
