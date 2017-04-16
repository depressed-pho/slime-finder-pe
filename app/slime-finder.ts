import 'bootstrap-loader';
import AtlasModel  from './model/atlas';
import CoordsModel from './model/coords';
import AtlasView   from './view/atlas';
import CoordsView  from './view/coords';
import Point       from 'slime-finder/point';
import $ = require('jquery');

$(() => {
    const initialCoords = new Point(1728, 48);
    const initialScale  = 5.0;

    const coordsModel   = new CoordsModel(initialCoords);
    const coordsView    = new CoordsView(coordsModel);

    const atlasModel    = new AtlasModel(coordsModel, initialScale);
    const atlasView     = new AtlasView(atlasModel);
});
