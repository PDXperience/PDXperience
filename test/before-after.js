const path = require('path');
require('dotenv').load({path: path.join(__dirname, '.env.test')});
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');

// DRY! extract common functionality to function
const dropDb = done => {
  const drop = () => connection.db.dropDatabase(done);
  if (connection.readyState === 1) drop();
  // retype, don't cut and paste
  else connection.on('open', drop);
};

before(dropDb);
after(dropDb);