'use strict';

var core = require('@react-leaflet/core');
var ie = require('leaflet');
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
var se = require('leaflet/dist/images/marker-icon.png');
var ce = require('leaflet/dist/images/marker-icon-2x.png');
var ue = require('leaflet/dist/images/marker-shadow.png');
var pe = require('@turf/center');
var ye = require('@turf/flip');
var bbox = require('@turf/bbox');
var reactLeafletGeomanV2 = require('react-leaflet-geoman-v2');
require('leaflet.fullscreen');
require('leaflet.fullscreen/Control.FullScreen.css');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var ie__default = /*#__PURE__*/_interopDefault(ie);
var se__default = /*#__PURE__*/_interopDefault(se);
var ce__default = /*#__PURE__*/_interopDefault(ce);
var ue__default = /*#__PURE__*/_interopDefault(ue);
var pe__default = /*#__PURE__*/_interopDefault(pe);
var ye__default = /*#__PURE__*/_interopDefault(ye);

var h=core.createPathComponent(function({data:r,...t},o){let i=new ie.GeoJSON(r,t);return core.createElementObject(i,core.extendContext(o,{overlayContainer:i}))},function(r,t,o){t.data!==o.data&&r.clearLayers().addData(t.data),t.style!==o.style&&(t.style==null?r.resetStyle():r.setStyle(t.style));});var p=toolkit.createEntityAdapter(),R=p.getSelectors(e=>e),W=p.getInitialState({$wire:null,$watch:null,state:null,config:{}}),_=(e,r)=>({addFeature:t=>e(o=>{p.addOne(o,{id:toolkit.nanoid(),...t});}),updateFeature:t=>e(o=>{p.updateOne(o,t);}),removeFeature:t=>e(o=>{p.removeOne(o,t);}),setFeatures:t=>e(o=>{p.setAll(o,t);}),removeFeatures:()=>e(t=>{p.removeAll(t);})}),Y=react.createContext(null),K=({children:e,value:r})=>{let t=react.useRef();return t.current||(t.current=zustand.createStore()(immer.immer((o,i)=>({...W,...r,..._(o),reset:()=>({...W,...r})})))),jsxRuntime.jsx(Y.Provider,{value:t.current,children:e})},b=e=>{let r=react.useContext(Y);if(!r)throw new Error("Missing MapStoreProvider");return zustand.useStore(r,e)};function le({state:e,setFeatures:r}){let t=invariant.getType(e);if(t==="MultiPoint")r(invariant.getCoords(e).map(o=>({id:toolkit.nanoid(),...helpers.point(o)})));else if(t==="MultiLineString")r(invariant.getCoords(e).map(o=>({id:toolkit.nanoid(),...helpers.lineString(o)})));else if(t==="MultiPolygon")r(invariant.getCoords(e).map(o=>({id:toolkit.nanoid(),...helpers.polygon(o)})));else if(["Point","LineString","Polygon"].includes(t))r([{id:toolkit.nanoid(),...helpers.feature(e)}]);else if(t==="GeometryCollection"){let o=[];meta.flattenEach(e,i=>o.push({id:toolkit.nanoid(),...i})),r(o);}}var F=le;function me(e={}){ie__default.default.Icon.Default.mergeOptions({iconUrl:se__default.default,iconRetinaUrl:ce__default.default,shadowUrl:ue__default.default,...e});}var de=me;function ge(e){return e&&invariant.getCoord(ye__default.default(pe__default.default(e)))}var x=ge;function Ge(e){let r=bbox.bbox(e);return [[r[1],r[0]],[r[3],r[2]]]}var S=Ge;function Me({state:e,config:{zoomToFeature:r},map:t}){let o=invariant.getGeom(e);if(geojsonValidation.isPoint(o)){if(r){let i=S(circle.circle(e,.25,{steps:4}));t.fitBounds(i,{animate:!1});}else t.panTo(x(e),{animate:!1});return}if(geojsonValidation.isGeoJSONObject(o))if(r){let i=S(e);t.fitBounds(i,{animate:!1});}else t.panTo(x(pointOnFeature.pointOnFeature(e)));}var V=Me;function we(){let e=reactLeaflet.useMap(),[r,t,o,i,J,s,L,c,v,l,d]=b(n=>[n.state,n.$wire,n.config.geomType,n.config.latitudeField,n.config.longitudeField,n.config.drawField,n.config.zoomToFeature,R.selectAll(n),n.updateFeature,n.setFeatures,n.removeFeature]);return react.useEffect(()=>{r&&(F({state:r,setFeatures:l}),V({state:r,config:{zoomToFeature:L},map:e}));},[]),reactUse.useUpdateEffect(()=>{if(c?.length){if(["Point","LineString","Polygon"].includes(o)&&c?.length===1){let n=invariant.getGeom(lodash.last(c));if(o==="Point"){let a=invariant.getCoord(n);i&&t.set(i,a[1],!1),J&&t.set(J,a[0],!1);}s&&t.set(s,JSON.stringify(n),!1);}else if(o==="MultiPoint"){let n=invariant.getGeom(helpers.multiPoint(lodash.map(c,a=>invariant.getCoord(a))));s&&t.set(s,JSON.stringify(n),!1);}else if(o==="MultiLineString"){let n=invariant.getGeom(helpers.multiLineString(lodash.map(c,a=>invariant.getCoords(a))));s&&t.set(s,JSON.stringify(n),!1);}else if(o==="MultiPolygon"){let n=invariant.getGeom(helpers.multiPolygon(lodash.map(c,a=>invariant.getCoords(a))));s&&t.set(s,JSON.stringify(n),!1);}else if(o==="GeometryCollection"){let n=invariant.getGeom(helpers.geometryCollection(lodash.map(c,a=>invariant.getGeom(a))));s&&t.set(s,JSON.stringify(n),!1);}}else s&&t.set(s,"",!1);},[JSON.stringify(c)]),c?.map((n,a)=>jsxRuntime.jsx(h,{data:n,eventHandlers:{"pm:update":({layer:u,target:f})=>{meta.featureEach(f.toGeoJSON(),(m,g)=>{v({id:m.id,changes:m});});},"pm:cut":u=>{e.removeLayer(u.layer);let f=lodash.get(u,"originalLayer.feature.id");d(f);let m=invariant.getType(u.layer.toGeoJSON()),g=invariant.getGeom(m===o?u.layer.toGeoJSON():u.originalLayer.toGeoJSON());F({state:g,setFeatures:l});}}},a))}var Pe=we;var X=core.createControlComponent(function(r){return new ie.Control.FullScreen(r)});function Ue(e){let{type:r,...t}=e;if(r==="wms"){let o={url:"",format:"image/png",transparent:!0,...t};return jsxRuntime.jsx(reactLeaflet.WMSTileLayer,{...o})}return null}var A=Ue;var Ke={zoomControl:reactLeaflet.ZoomControl,layersControl:reactLeaflet.LayersControl,drawControl:reactLeafletGeomanV2.GeomanControls,attributionControl:reactLeaflet.AttributionControl,scaleControl:reactLeaflet.ScaleControl,fullscreenControl:X},qe={drawMarker:!0,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!1,drawRectangle:!1,drawPolygon:!1,drawText:!1,editMode:!0,dragMode:!1,cutPolygon:!1,removalMode:!0,rotateMode:!1};function et(){let[e,r,t,o]=b(l=>[l.config.geomType,l.config.layers,l.config.baseLayers,l.config.controls]),[i,J,s]=b(l=>[l.addFeature,l.removeFeature,l.removeFeatures]),L=l=>{l.target.removeLayer(l.layer),["Point","LineString","Polygon"].includes(e)&&s(),i(l.layer.toGeoJSON());},c=({layer:l,target:d})=>{let n=l.feature.id;n&&J(n);};return react.useMemo(()=>lodash.map(o,(l,d)=>{let n=Ke[d];if(!l||l?.enabled==!1||!n)return null;let a={...l},u=null;return d==="layersControl"&&(u=jsxRuntime.jsxs(react.Fragment,{children:[t?.map(({selected:f=!1,title:m="None",...g},O)=>jsxRuntime.jsx(reactLeaflet.LayersControl.BaseLayer,{name:m,checked:f,children:jsxRuntime.jsx(reactLeaflet.TileLayer,{url:"",...g})},O)),r?.map(({selected:f=!1,title:m="None",...g},O)=>jsxRuntime.jsx(reactLeaflet.LayersControl.Overlay,{name:m,checked:f,children:jsxRuntime.jsx(A,{...g})},O))]})),d==="drawControl"&&(a={...a,options:qe},["Point","MultiPoint"].includes(e)?a.options={...a.options,drawMarker:!0,editMode:!0,removalMode:!0}:["LineString","MultiLineString"].includes(e)?a.options={...a.options,drawPolyline:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:["Polygon","MultiPolygon"].includes(e)?a.options={...a.options,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:a.options={...a.options,drawMarker:!0,drawCircle:!0,drawPolyline:!0,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0},a.onCreate=L,a.onMapRemove=c),jsxRuntime.jsx(n,{...a,children:u},d)}).filter(l=>l),[JSON.stringify(o)]).map(l=>l)}var tt=et;

exports.ControlManager = tt;
exports.FeatureManager = Pe;
exports.FullscreenControl = X;
exports.GeoJSON = h;
exports.MapStoreProvider = K;
exports.featuresSelectors = R;
exports.setDefaultIcon = de;
exports.setFeaturesByState = F;
exports.toBounds = S;
exports.toLatLng = x;
exports.useMapStore = b;
exports.zoomToFeatureByState = V;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map