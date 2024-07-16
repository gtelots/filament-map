'use strict';

var core = require('@react-leaflet/core');
var ae = require('leaflet');
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
var le = require('leaflet/dist/images/marker-icon.png');
var ie = require('leaflet/dist/images/marker-icon-2x.png');
var se = require('leaflet/dist/images/marker-shadow.png');
var me = require('@turf/center');
var fe = require('@turf/flip');
var bbox = require('@turf/bbox');
var reactLeafletGeomanV2 = require('react-leaflet-geoman-v2');
require('leaflet.fullscreen');
require('leaflet.fullscreen/Control.FullScreen.css');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var ae__default = /*#__PURE__*/_interopDefault(ae);
var le__default = /*#__PURE__*/_interopDefault(le);
var ie__default = /*#__PURE__*/_interopDefault(ie);
var se__default = /*#__PURE__*/_interopDefault(se);
var me__default = /*#__PURE__*/_interopDefault(me);
var fe__default = /*#__PURE__*/_interopDefault(fe);

var h=core.createPathComponent(function({data:n,...t},r){let l=new ae.GeoJSON(n,t);return core.createElementObject(l,core.extendContext(r,{overlayContainer:l}))},function(n,t,r){t.data!==r.data&&n.clearLayers().addData(t.data),t.style!==r.style&&(t.style==null?n.resetStyle():n.setStyle(t.style));});var f=toolkit.createEntityAdapter(),R=f.getSelectors(e=>e),W=f.getInitialState({$wire:null,$watch:null,state:null,config:{}}),D=(e,n)=>({addFeature:t=>e(r=>{f.addOne(r,{id:toolkit.nanoid(),...t});}),updateFeature:t=>e(r=>{f.updateOne(r,t);}),removeFeature:t=>e(r=>{f.removeOne(r,t);}),setFeatures:t=>e(r=>{f.setAll(r,t);}),removeFeatures:()=>e(t=>{f.removeAll(t);})}),I=react.createContext(null),$=({children:e,value:n})=>{let t=react.useRef();return t.current||(t.current=zustand.createStore()(immer.immer((r,l)=>({...W,...n,...D(r),reset:()=>({...W,...n})})))),jsxRuntime.jsx(I.Provider,{value:t.current,children:e})},g=e=>{let n=react.useContext(I);if(!n)throw new Error("Missing MapStoreProvider");return zustand.useStore(n,e)};function ne({state:e,setFeatures:n}){let t=invariant.getType(e);if(t==="MultiPoint")n(invariant.getCoords(e).map(r=>({id:toolkit.nanoid(),...helpers.point(r)})));else if(t==="MultiLineString")n(invariant.getCoords(e).map(r=>({id:toolkit.nanoid(),...helpers.lineString(r)})));else if(t==="MultiPolygon")n(invariant.getCoords(e).map(r=>({id:toolkit.nanoid(),...helpers.polygon(r)})));else if(["Point","LineString","Polygon"].includes(t))n([{id:toolkit.nanoid(),...helpers.feature(e)}]);else if(t==="GeometryCollection"){let r=[];meta.flattenEach(e,l=>r.push({id:toolkit.nanoid(),...l})),n(r);}}var S=ne;function ce(e={}){ae__default.default.Icon.Default.mergeOptions({iconUrl:le__default.default,iconRetinaUrl:ie__default.default,shadowUrl:se__default.default,...e});}var ue=ce;function pe(e){return e&&invariant.getCoord(fe__default.default(me__default.default(e)))}var x=pe;function ge(e){let n=bbox.bbox(e);return [[n[1],n[0]],[n[3],n[2]]]}var F=ge;function xe({state:e,config:{zoomToFeature:n},map:t}){let r=invariant.getGeom(e);if(geojsonValidation.isPoint(r)){if(n){let l=F(circle.circle(e,.25,{steps:4}));t.fitBounds(l,{animate:!1});}else t.panTo(x(e),{animate:!1});return}if(geojsonValidation.isGeoJSONObject(r))if(n){let l=F(e);t.fitBounds(l,{animate:!1});}else t.panTo(x(pointOnFeature.pointOnFeature(e)));}var O=xe;function Ye(){let e=reactLeaflet.useMap(),[n,t,r,l,C,s,X,c,a,u,m]=g(o=>[o.state,o.$wire,o.config.geomType,o.config.latitudeField,o.config.longitudeField,o.config.drawField,o.config.zoomToFeature,R.selectAll(o),o.updateFeature,o.setFeatures,o.removeFeature]);return react.useEffect(()=>{n&&(S({state:n,setFeatures:u}),O({state:n,config:{zoomToFeature:X},map:e}));},[]),reactUse.useUpdateEffect(()=>{if(c?.length){if(["Point","LineString","Polygon"].includes(r)&&c?.length===1){let o=invariant.getGeom(lodash.last(c));if(r==="Point"){let i=invariant.getCoord(o);l&&t.set(l,i[1],!1),C&&t.set(C,i[0],!1);}s&&t.set(s,JSON.stringify(o),!1);}else if(r==="MultiPoint"){let o=invariant.getGeom(helpers.multiPoint(lodash.map(c,i=>invariant.getCoord(i))));s&&t.set(s,JSON.stringify(o),!1);}else if(r==="MultiLineString"){let o=invariant.getGeom(helpers.multiLineString(lodash.map(c,i=>invariant.getCoords(i))));s&&t.set(s,JSON.stringify(o),!1);}else if(r==="MultiPolygon"){let o=invariant.getGeom(helpers.multiPolygon(lodash.map(c,i=>invariant.getCoords(i))));s&&t.set(s,JSON.stringify(o),!1);}else if(r==="GeometryCollection"){let o=invariant.getGeom(helpers.geometryCollection(lodash.map(c,i=>invariant.getGeom(i))));s&&t.set(s,JSON.stringify(o),!1);}}else s&&t.set(s,"",!1);},[JSON.stringify(c)]),c?.map((o,i)=>jsxRuntime.jsx(h,{data:o,eventHandlers:{"pm:update":({layer:d,target:b})=>{meta.featureEach(b.toGeoJSON(),(y,J)=>{a({id:y.id,changes:y});});},"pm:cut":d=>{e.removeLayer(d.layer);let b=lodash.get(d,"originalLayer.feature.id");m(b);let y=invariant.getType(d.layer.toGeoJSON()),J=invariant.getGeom(y===r?d.layer.toGeoJSON():d.originalLayer.toGeoJSON());S({state:J,setFeatures:u});}}},i))}var we=Ye;var v=core.createControlComponent(function(n){return new ae.Control.FullScreen(n)});var Te={zoomControl:reactLeaflet.ZoomControl,layersControl:reactLeaflet.LayersControl,drawControl:reactLeafletGeomanV2.GeomanControls,attributionControl:reactLeaflet.AttributionControl,scaleControl:reactLeaflet.ScaleControl,fullscreenControl:v},Ee={drawMarker:!0,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!1,drawRectangle:!1,drawPolygon:!1,drawText:!1,editMode:!0,dragMode:!1,cutPolygon:!1,removalMode:!0,rotateMode:!1};function He(){let[e,n,t]=g(a=>[a.config.geomType,a.config.baseLayers,a.config.controls]),[r,l,C]=g(a=>[a.addFeature,a.removeFeature,a.removeFeatures]),s=a=>{a.target.removeLayer(a.layer),["Point","LineString","Polygon"].includes(e)&&C(),r(a.layer.toGeoJSON());},X=({layer:a,target:u})=>{let m=a.feature.id;m&&l(m);};return lodash.map(t,(a,u)=>{let m=Te[u];if(!a||a?.enabled==!1||!m)return null;console.log(u);let o={...a},i=null;return u==="layersControl"&&(i=jsxRuntime.jsx(react.Fragment,{children:n?.map(({selected:d=!1,title:b="None",...y},J)=>jsxRuntime.jsx(reactLeaflet.LayersControl.BaseLayer,{name:b,checked:d,children:jsxRuntime.jsx(reactLeaflet.TileLayer,{url:"",...y})},J))})),u==="drawControl"&&(o={...o,options:Ee},["Point","MultiPoint"].includes(e)?o.options={...o.options,drawMarker:!0,editMode:!0,removalMode:!0}:["LineString","MultiLineString"].includes(e)?o.options={...o.options,drawPolyline:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:["Polygon","MultiPolygon"].includes(e)?o.options={...o.options,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:o.options={...o.options,drawMarker:!0,drawCircle:!0,drawPolyline:!0,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0},o.onCreate=s,o.onMapRemove=X),jsxRuntime.jsx(m,{...o,children:i},u)}).filter(a=>a).map(a=>a)}var De=He;

exports.ControlManager = De;
exports.FeatureManager = we;
exports.FullscreenControl = v;
exports.GeoJSON = h;
exports.MapStoreProvider = $;
exports.featuresSelectors = R;
exports.setDefaultIcon = ue;
exports.setFeaturesByState = S;
exports.toBounds = F;
exports.toLatLng = x;
exports.useMapStore = g;
exports.zoomToFeatureByState = O;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map