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
    let formattedName;
    formattedName = name.toLocaleLowerCase().trim().replace(/\s/g, '');

    if (formattedName === 'mr.mime') {
      return this.findOne({where: {name: 'Mr. Mime'}});
    }

    formattedName = formattedName.split('');
    formattedName[0] = formattedName[0].toLocaleUpperCase();
    formattedName = formattedName.join('');

    return this.findOne({where: {name: formattedName}});
  }

  async getTypes(): Promise<
    string[] | string[][] | (Pokemon & PokemonRelations)[]
  > {
    const list = await this.find({
      fields: {
        types: true,
      },
    });
    const types = list.map(l => l.types).flat(1);

    return [...new Set(types)];
  }
}
