import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Pokemon} from '../models';
import {PokemonRepository} from '../repositories';

const padLeadingZeros = (id: string, size: number) => {
  let s = id + '';
  while (s.length < size) s = '0' + s;
  return s;
};

export class PokemonController {
  constructor(
    @repository(PokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {}

  @post('/pokemon')
  @response(200, {
    description: 'Pokemon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pokemon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {
            title: 'NewPokemon',
          }),
        },
      },
    })
    pokemon: Pokemon,
  ): Promise<Pokemon> {
    return this.pokemonRepository.create(pokemon);
  }

  @get('/pokemon/count')
  @response(200, {
    description: 'Pokemon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Pokemon) where?: Where<Pokemon>): Promise<Count> {
    return this.pokemonRepository.count(where);
  }

  @get('/pokemon')
  @response(200, {
    description: 'Array of Pokemon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pokemon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pokemon) filter?: Filter<Pokemon>,
  ): Promise<Pokemon[]> {
    return this.pokemonRepository.find(filter);
  }

  @get('/pokemon/types')
  @response(200, {
    description: 'Array of Pokemon types',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pokemon),
        },
      },
    },
  })
  async getTypes(): Promise<string[]> {
    return this.pokemonRepository.getTypes();
  }

  @get('/pokemon/favorites')
  @response(200, {
    description: 'Array of favorite Pokemon',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pokemon),
        },
      },
    },
  })
  async getFavorites(): Promise<Pokemon[]> {
    return this.pokemonRepository.getFavorites();
  }

  @patch('/pokemon')
  @response(200, {
    description: 'Pokemon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
    @param.where(Pokemon) where?: Where<Pokemon>,
  ): Promise<Count> {
    return this.pokemonRepository.updateAll(pokemon, where);
  }

  @patch('/pokemon/{id}/favorite')
  @response(200, {
    description: 'Mark your favorite Pokemon',
  })
  async saveFavorite(
    @param.path.string('id') id: string,
    @param.query.string('favorite', {
      type: 'boolean',
    })
    favorite: boolean,
  ): Promise<void> {
    const ident = padLeadingZeros(id.trim().toString(), 3);
    return this.pokemonRepository.updateById(ident, {favorite: favorite});
  }

  @get('/pokemon/{id}')
  @response(200, {
    description: 'Pokemon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pokemon, {exclude: 'where'})
    filter?: FilterExcludingWhere<Pokemon>,
  ): Promise<Pokemon> {
    const ident = padLeadingZeros(id.trim().toString(), 3);
    return this.pokemonRepository.findById(ident, filter);
  }

  @get('/pokemon/name')
  @response(200, {
    description: 'A single Pokemon model instance found by name',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
      },
    },
  })
  async findByName(
    @param.query.string('name', {
      type: 'string',
    })
    name: string,
  ): Promise<Pokemon | null> {
    return this.pokemonRepository.findByName(name.trim());
  }

  @patch('/pokemon/{id}')
  @response(204, {
    description: 'Pokemon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
  ): Promise<void> {
    await this.pokemonRepository.updateById(id, pokemon);
  }

  @put('/pokemon/{id}')
  @response(204, {
    description: 'Pokemon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pokemon: Pokemon,
  ): Promise<void> {
    await this.pokemonRepository.replaceById(id, pokemon);
  }

  @del('/pokemon/{id}')
  @response(204, {
    description: 'Pokemon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pokemonRepository.deleteById(id);
  }
}
