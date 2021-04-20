import {juggler} from '@loopback/repository';

export const testdb: juggler.DataSource = new juggler.DataSource({
  name: 'testdb',
  connector: 'mongodb',
  url: 'mongodb://127.0.0.1:27017/testdb',
  host: '127.0.0.1',
  port: 27017,
  user: '',
  password: '',
  database: 'testdb',
  useNewUrlParser: false,
});
