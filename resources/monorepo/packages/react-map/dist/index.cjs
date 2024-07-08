'use strict';

var core = require('@react-leaflet/core');
var p = require('leaflet');
require('leaflet.fullscreen');
require('leaflet.fullscreen/Control.FullScreen.css');
var u = require('leaflet/dist/images/marker-icon.png');
var G = require('leaflet/dist/images/marker-icon-2x.png');
var f = require('leaflet/dist/images/marker-shadow.png');
var invariant = require('@turf/invariant');
var y = require('@turf/center');
var C = require('@turf/flip');
var bbox = require('@turf/bbox');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var p__default = /*#__PURE__*/_interopDefault(p);
var u__default = /*#__PURE__*/_interopDefault(u);
var G__default = /*#__PURE__*/_interopDefault(G);
var f__default = /*#__PURE__*/_interopDefault(f);
var y__default = /*#__PURE__*/_interopDefault(y);
var C__default = /*#__PURE__*/_interopDefault(C);

var d=core.createPathComponent(function({data:t,...e},r){let l=new p.GeoJSON(t,e);return core.createElementObject(l,core.extendContext(r,{overlayContainer:l}))},function(t,e,r){e.data!==r.data&&t.clearLayers().addData(e.data),e.style!==r.style&&(e.style==null?t.resetStyle():t.setStyle(e.style));});var s=core.createControlComponent(function(t){return new p.Control.FullScreen(t)});function J(o={}){p__default.default.Icon.Default.mergeOptions({iconUrl:u__default.default,iconRetinaUrl:G__default.default,shadowUrl:f__default.default,...o});}var X=J;function x(o){return o&&invariant.getCoord(C__default.default(y__default.default(o)))}var W=x;function h(o){let t=bbox.bbox(o);return [[t[1],t[0]],[t[3],t[2]]]}var I=h;

exports.FullscreenControl = s;
exports.GeoJSON = d;
exports.setDefaultIcon = X;
exports.toBounds = I;
exports.toLatLng = W;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map