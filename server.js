const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const {merge} = require('lodash');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3000;