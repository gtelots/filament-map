import { createPathComponent, createElementObject, extendContext, createControlComponent } from '@react-leaflet/core';
import p, { GeoJSON, Control } from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import u from 'leaflet/dist/images/marker-icon.png';
import G from 'leaflet/dist/images/marker-icon-2x.png';
import f from 'leaflet/dist/images/marker-shadow.png';
import { getCoord } from '@turf/invariant';
import y from '@turf/center';
import C from '@turf/flip';
import { bbox } from '@turf/bbox';

var d=createPathComponent(function({data:t,...e},r){let l=new GeoJSON(t,e);return createElementObject(l,extendContext(r,{overlayContainer:l}))},function(t,e,r){e.data!==r.data&&t.clearLayers().addData(e.data),e.style!==r.style&&(e.style==null?t.resetStyle():t.setStyle(e.style));});var s=createControlComponent(function(t){return new Control.FullScreen(t)});function J(o={}){p.Icon.Default.mergeOptions({iconUrl:u,iconRetinaUrl:G,shadowUrl:f,...o});}var X=J;function x(o){return o&&getCoord(C(y(o)))}var W=x;function h(o){let t=bbox(o);return [[t[1],t[0]],[t[3],t[2]]]}var I=h;

export { s as FullscreenControl, d as GeoJSON, X as setDefaultIcon, I as toBounds, W as toLatLng };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map