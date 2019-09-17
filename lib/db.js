const mongoose = require('mongoose');
const dbConfig = require('../config/keys');

// Schemas
require('./models/Proposals');

mongoose.connect(dbConfig.databaseURL, { useNewUrlParser: true });

// disable deprecated warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
