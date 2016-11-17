const path = require('path');
require('dotenv').load({path: path.join(__dirname, '.env.test')});
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');


before( done => {
  const drop = () => connection.db.dropDatabase(done);
  if (connection.readyState === 1) drop();
  else connection.on( 'open', drop );
});

after( done => {
  const drop = () => connection.db.dropDatabase(done);
  if (connection.readyState === 1) drop();
  else connection.on( 'open', drop );
});