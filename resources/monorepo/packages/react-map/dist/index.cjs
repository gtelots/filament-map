'use strict';

var core = require('@react-leaflet/core');
var se = require('leaflet');
var helpers = require('@turf/helpers');
var invariant = require('@turf/invariant');
var meta = require('@turf/meta');
var lodash = require('lodash');
var react = require('react');
var reactLeaflet = require('react-leaflet');
var toolkit = require('@reduxjs/toolkit');
var zustand = require('zustand');
var immer = require('zustand/middleware/immer');
var jsxRuntime = require('react/jsx-runtime');
var reactUse = require('react-use');
var circle = require('@turf/circle');
var pointOnFeature = require('@turf/point-on-feature');
var geojsonValidation = require('geojson-validation');
var ce = require('leaflet/dist/images/marker-icon.png');
var ue = require('leaflet/dist/images/marker-icon-2x.png');
var me = require('leaflet/dist/images/marker-shadow.png');
var ye = require('@turf/center');
var ge = require('@turf/flip');
var bbox = require('@turf/bbox');
var reactLeafletGeomanV2 = require('react-leaflet-geoman-v2');
require('leaflet.fullscreen');
require('leaflet.fullscreen/Control.FullScreen.css');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var se__default = /*#__PURE__*/_interopDefault(se);
var ce__default = /*#__PURE__*/_interopDefault(ce);
var ue__default = /*#__PURE__*/_interopDefault(ue);
var me__default = /*#__PURE__*/_interopDefault(me);
var ye__default = /*#__PURE__*/_interopDefault(ye);
var ge__default = /*#__PURE__*/_interopDefault(ge);

var G=core.createPathComponent(function({data:r,...e},o){let i=new se.GeoJSON(r,e);return core.createElementObject(i,core.extendContext(o,{overlayContainer:i}))},function(r,e,o){e.data!==o.data&&r.clearLayers().addData(e.data),e.style!==o.style&&(e.style==null?r.resetStyle():r.setStyle(e.style));});var p=toolkit.createEntityAdapter(),R=p.getSelectors(t=>t),W=p.getInitialState({$wire:null,$watch:null,state:null,config:{}}),K=(t,r)=>({addFeature:e=>t(o=>{p.addOne(o,{id:toolkit.nanoid(),...e});}),updateFeature:e=>t(o=>{p.updateOne(o,e);}),removeFeature:e=>t(o=>{p.removeOne(o,e);}),setFeatures:e=>t(o=>{p.setAll(o,e);}),removeFeatures:()=>t(e=>{p.removeAll(e);})}),Y=react.createContext(null),q=({children:t,value:r})=>{let e=react.useRef();return e.current||(e.current=zustand.createStore()(immer.immer((o,i)=>({...W,...r,...K(o),reset:()=>({...W,...r})})))),jsxRuntime.jsx(Y.Provider,{value:e.current,children:t})},b=t=>{let r=react.useContext(Y);if(!r)throw new Error("Missing MapStoreProvider");return zustand.useStore(r,t)};function ie({state:t,setFeatures:r}){let e=invariant.getType(t);if(e==="MultiPoint")r(invariant.getCoords(t).map(o=>({id:toolkit.nanoid(),...helpers.point(o)})));else if(e==="MultiLineString")r(invariant.getCoords(t).map(o=>({id:toolkit.nanoid(),...helpers.lineString(o)})));else if(e==="MultiPolygon")r(invariant.getCoords(t).map(o=>({id:toolkit.nanoid(),...helpers.polygon(o)})));else if(["Point","LineString","Polygon"].includes(e))r([{id:toolkit.nanoid(),...helpers.feature(t)}]);else if(e==="GeometryCollection"){let o=[];meta.flattenEach(t,i=>o.push({id:toolkit.nanoid(),...i})),r(o);}}var S=ie;function de(t={}){se__default.default.Icon.Default.mergeOptions({iconUrl:ce__default.default,iconRetinaUrl:ue__default.default,shadowUrl:me__default.default,...t});}var fe=de;function be(t){return t&&invariant.getCoord(ge__default.default(ye__default.default(t)))}var x=be;function Ce(t){let r=bbox.bbox(t);return [[r[1],r[0]],[r[3],r[2]]]}var M=Ce;function Oe({state:t,config:{zoomToFeature:r},map:e}){let o=invariant.getGeom(t);if(geojsonValidation.isPoint(o)){if(r){let i=M(circle.circle(t,.25,{steps:4}));e.fitBounds(i,{animate:!1});}else e.panTo(x(t),{animate:!1});return}if(geojsonValidation.isGeoJSONObject(o))if(r){let i=M(t);e.fitBounds(i,{animate:!1});}else e.panTo(x(pointOnFeature.pointOnFeature(t)));}var V=Oe;function Pe(){let t=reactLeaflet.useMap(),[r,e,o,i,F,s,L,c,v,l,d]=b(n=>[n.state,n.$wire,n.config.geomType,n.config.latitudeField,n.config.longitudeField,n.config.drawField,n.config.zoomToFeature,R.selectAll(n),n.updateFeature,n.setFeatures,n.removeFeature]);return react.useEffect(()=>{r&&(S({state:r,setFeatures:l}),V({state:r,config:{zoomToFeature:L},map:t}));},[]),reactUse.useUpdateEffect(()=>{if(c?.length){if(["Point","LineString","Polygon"].includes(o)&&c?.length===1){let n=invariant.getGeom(lodash.last(c));if(o==="Point"){let a=invariant.getCoord(n);i&&e.set(i,a[1],!1),F&&e.set(F,a[0],!1);}s&&e.set(s,JSON.stringify(n),!1);}else if(o==="MultiPoint"){let n=invariant.getGeom(helpers.multiPoint(lodash.map(c,a=>invariant.getCoord(a))));s&&e.set(s,JSON.stringify(n),!1);}else if(o==="MultiLineString"){let n=invariant.getGeom(helpers.multiLineString(lodash.map(c,a=>invariant.getCoords(a))));s&&e.set(s,JSON.stringify(n),!1);}else if(o==="MultiPolygon"){let n=invariant.getGeom(helpers.multiPolygon(lodash.map(c,a=>invariant.getCoords(a))));s&&e.set(s,JSON.stringify(n),!1);}else if(o==="GeometryCollection"){let n=invariant.getGeom(helpers.geometryCollection(lodash.map(c,a=>invariant.getGeom(a))));s&&e.set(s,JSON.stringify(n),!1);}}else s&&e.set(s,"",!1);},[JSON.stringify(c)]),c?.map((n,a)=>jsxRuntime.jsx(G,{data:n,eventHandlers:{"pm:update":({layer:u,target:f})=>{meta.featureEach(f.toGeoJSON(),(m,g)=>{v({id:m.id,changes:m});});},"pm:cut":u=>{t.removeLayer(u.layer);let f=lodash.get(u,"originalLayer.feature.id");d(f);let m=invariant.getType(u.layer.toGeoJSON()),g=invariant.getGeom(m===o?u.layer.toGeoJSON():u.originalLayer.toGeoJSON());S({state:g,setFeatures:l});}}},a))}var Ne=Pe;var I=core.createControlComponent(function(r){return new se.Control.FullScreen(r)});function ze(t){let{type:r,...e}=t;if(r==="wms"){let o={url:"",format:"image/png",transparent:!0,...e};return jsxRuntime.jsx(reactLeaflet.WMSTileLayer,{...o})}if(r==="geojson"){let o={data:JSON.parse(e.data),pmIgnore:!0};return jsxRuntime.jsx(G,{...o})}return null}var A=ze;var Ke={zoomControl:reactLeaflet.ZoomControl,layersControl:reactLeaflet.LayersControl,drawControl:reactLeafletGeomanV2.GeomanControls,attributionControl:reactLeaflet.AttributionControl,scaleControl:reactLeaflet.ScaleControl,fullscreenControl:I},qe={drawMarker:!0,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!1,drawRectangle:!1,drawPolygon:!1,drawText:!1,editMode:!0,dragMode:!1,cutPolygon:!1,removalMode:!0,rotateMode:!1};function et(){let[t,r,e,o]=b(l=>[l.config.geomType,l.config.layers,l.config.baseLayers,l.config.controls]),[i,F,s]=b(l=>[l.addFeature,l.removeFeature,l.removeFeatures]),L=l=>{l.target.removeLayer(l.layer),["Point","LineString","Polygon"].includes(t)&&s(),i(l.layer.toGeoJSON());},c=({layer:l,target:d})=>{let n=l.feature.id;n&&F(n);};return react.useMemo(()=>lodash.map(o,(l,d)=>{let n=Ke[d];if(!l||l?.enabled==!1||!n)return null;let a={...l},u=null;return d==="layersControl"&&(u=jsxRuntime.jsxs(react.Fragment,{children:[e?.map(({selected:f=!1,title:m="None",...g},h)=>jsxRuntime.jsx(reactLeaflet.LayersControl.BaseLayer,{name:m,checked:f,children:jsxRuntime.jsx(reactLeaflet.TileLayer,{url:"",...g})},h)),r?.map(({selected:f=!1,title:m="None",...g},h)=>jsxRuntime.jsx(reactLeaflet.LayersControl.Overlay,{name:m,checked:f,children:jsxRuntime.jsx(A,{...g})},h))]})),d==="drawControl"&&(a={...a,options:qe},["Point","MultiPoint"].includes(t)?a.options={...a.options,drawMarker:!0,editMode:!0,removalMode:!0}:["LineString","MultiLineString"].includes(t)?a.options={...a.options,drawPolyline:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:["Polygon","MultiPolygon"].includes(t)?a.options={...a.options,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:a.options={...a.options,drawMarker:!0,drawCircle:!0,drawPolyline:!0,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0},a.onCreate=L,a.onMapRemove=c),jsxRuntime.jsx(n,{...a,children:u},d)}).filter(l=>l),[JSON.stringify(o)]).map(l=>l)}var tt=et;

exports.ControlManager = tt;
exports.FeatureManager = Ne;
exports.FullscreenControl = I;
exports.GeoJSON = G;
exports.MapStoreProvider = q;
exports.featuresSelectors = R;
exports.setDefaultIcon = fe;
exports.setFeaturesByState = S;
exports.toBounds = M;
exports.toLatLng = x;
exports.useMapStore = b;
exports.zoomToFeatureByState = V;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map