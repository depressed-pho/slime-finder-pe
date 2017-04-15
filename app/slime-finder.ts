import 'bootstrap-loader';
//import 'jquery';
//import 'imports-loader?jQuery=jquery!bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

//import Chunk from 'slime-finder/chunk';
//import require = require('webpack.d.ts');

import * as Model from './model/coords';
import * as View  from './view/coords';
import $ = require('jquery');

$(() => {
    let coordsModel = new Model.Coords({x: 1728, z: 48});
    let coordsView  = new View.Coords(coordsModel);
});
