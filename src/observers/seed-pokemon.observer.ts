import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Pokemon} from '../models';
import {PokemonRepository} from '../repositories';
import PokemonList from './pokemon.json';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class SeedPokemonObserver implements LifeCycleObserver {
  /*
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {}
  */
  constructor(
    @repository('PokemonRepository')
    private pokeRepo: PokemonRepository,
  ) { }

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Add your logic for start

    const count = (await this.pokeRepo.count()).count;
    if (count !== 0) return;

    const created = PokemonList.map(pokemon => {
      return new Pokemon({...pokemon});
    });

    const results = await Promise.all(
      created.map(c => {
        return this.pokeRepo.create(c);
      }),
    );

    console.log('RESULT', results);
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
