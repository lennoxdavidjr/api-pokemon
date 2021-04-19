import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Pokemon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  classification: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  types: string[];

  @property({
    type: 'array',
    itemType: 'string',
    default: null,
  })
  resistant?: string[];

  @property({
    type: 'array',
    itemType: 'string',
    default: null,
  })
  weaknesses?: string[];

  @property({
    type: 'object',
    required: true,
  })
  weight: object;

  @property({
    type: 'object',
    required: true,
  })
  height: object;

  @property({
    type: 'number',
    required: true,
  })
  fleeRate: number;

  @property({
    type: 'object',
    default: null,
  })
  evolutionRequirements?: object;

  @property({
    type: 'array',
    itemType: 'object',
    default: null,
  })
  evolutions?: object[];

  @property({
    type: 'number',
    required: true,
  })
  maxCP: number;

  @property({
    type: 'number',
    required: true,
  })
  maxHP: number;

  @property({
    type: 'object',
    required: true,
  })
  attacks: object;

  @property({
    type: 'boolean',
    default: false,
  })
  favorite: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pokemon>) {
    super(data);
  }
}

export interface PokemonRelations {
  // describe navigational properties here
}

export type PokemonWithRelations = Pokemon & PokemonRelations;
