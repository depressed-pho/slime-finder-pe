import 'bootstrap-loader';
import '../scss/app.scss';
import AtlasModel  from './model/atlas';
import CoordsModel from './model/coords';
import AtlasView   from './view/atlas';
import CoordsView  from './view/coords';
import Point       from 'slime-finder/point';
import $ = require('jquery');

$(() => {
    /* If the URI hash contains coordinates, we use it as the initial
     * value.
     */
    const initialCoords = (() => {
        let m = window.location.hash.match(/^#([-0-9.]+),([-0-9.]+)$/);
        if (m) {
            return new Point(Number(m[1]), Number(m[2]));
        }
        else {
            return new Point(0, 0);
        }
    })();

    /* If the localStorage contains scale, we use it as the initial
     * value.
     */
    const initialScale  = (() => {
        let sc = localStorage.getItem('atlas.scale');
        return sc == null ? 4.0 : Number(sc);
    })();

    const coordsModel   = new CoordsModel(initialCoords);
    const coordsView    = new CoordsView(coordsModel);

    const atlasModel    = new AtlasModel(coordsModel, initialScale);
    const atlasView     = new AtlasView(atlasModel);

    /* Changes in coordsModel.prop updates the URI hash.
     */
    coordsModel.prop.onValue((p: Point) => {
        window.history.replaceState('', '', `#${p.x},${p.z}`);
    });

    /* Changes in atlasModel.scale updates the localStorage.
     */
    atlasModel.scale.onValue((sc: number) => {
        localStorage.setItem('atlas.scale', String(sc));
    });
});
