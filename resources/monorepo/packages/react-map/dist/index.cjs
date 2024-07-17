'use strict';

var core = require('@react-leaflet/core');
var he = require('leaflet');
var lodash = require('lodash');
var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var helpers = require('@turf/helpers');
var invariant = require('@turf/invariant');
var meta = require('@turf/meta');
var reactLeaflet = require('react-leaflet');
var toolkit = require('@reduxjs/toolkit');
var zustand = require('zustand');
var immer = require('zustand/middleware/immer');
var reactUse = require('react-use');
var circle = require('@turf/circle');
var pointOnFeature = require('@turf/point-on-feature');
var geojsonValidation = require('geojson-validation');
var Oe = require('leaflet/dist/images/marker-icon.png');
var Xe = require('leaflet/dist/images/marker-icon-2x.png');
var Le = require('leaflet/dist/images/marker-shadow.png');
var ve = require('@turf/center');
var Be = require('@turf/flip');
var bbox = require('@turf/bbox');
var reactLeafletGeomanV2 = require('react-leaflet-geoman-v2');
require('leaflet.fullscreen');
require('leaflet.fullscreen/Control.FullScreen.css');
var server = require('react-dom/server');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var he__default = /*#__PURE__*/_interopDefault(he);
var Oe__default = /*#__PURE__*/_interopDefault(Oe);
var Xe__default = /*#__PURE__*/_interopDefault(Xe);
var Le__default = /*#__PURE__*/_interopDefault(Le);
var ve__default = /*#__PURE__*/_interopDefault(ve);
var Be__default = /*#__PURE__*/_interopDefault(Be);

var g=core.createPathComponent(function({data:r,...e},o){let n=new he.GeoJSON(r,e);return core.createElementObject(n,core.extendContext(o,{overlayContainer:n}))},function(r,e,o){e.data!==o.data&&r.clearLayers().addData(e.data),e.style!==o.style&&(e.style==null?r.resetStyle():r.setStyle(e.style));});var v=(t,r)=>t?lodash.template(t,{interpolate:/{{([\s\S]+?)}}/g})(r):"";function ee(t){let{template:r,heading:e,content:o,data:n}=t;return r?jsxRuntime.jsx("div",{dangerouslySetInnerHTML:{__html:v(r,n)}}):jsxRuntime.jsxs("div",{children:[jsxRuntime.jsx("div",{className:"pc-heading",children:v(e,n)}),jsxRuntime.jsx("hr",{}),lodash.isArray(o)?jsxRuntime.jsx("div",{children:o?.map((p,s)=>jsxRuntime.jsxs("div",{children:[jsxRuntime.jsxs("span",{className:"pc-content-label",children:[p.label,": "]}),lodash.get(n,p.value)]},s))}):jsxRuntime.jsx("div",{dangerouslySetInnerHTML:{__html:v(o,n)}})]})}var O=ee;function ae(t){let{dataUrl:r,children:e,...o}=t,[n,p]=react.useState(null);return react.useEffect(()=>{r&&fetch(r).then(s=>s.json()).then(s=>{p(s);});},[r]),jsxRuntime.jsx(g,{...o,data:n,children:lodash.isFunction(e)&&n&&e(n)})}var V=ae;var b=toolkit.createEntityAdapter(),W=b.getSelectors(t=>t),Y=b.getInitialState({$wire:null,$watch:null,state:null,config:{}}),fe=(t,r)=>({addFeature:e=>t(o=>{b.addOne(o,{id:toolkit.nanoid(),...e});}),updateFeature:e=>t(o=>{b.updateOne(o,e);}),removeFeature:e=>t(o=>{b.removeOne(o,e);}),setFeatures:e=>t(o=>{b.setAll(o,e);}),removeFeatures:()=>t(e=>{b.removeAll(e);})}),A=react.createContext(null),ye=({children:t,value:r})=>{let e=react.useRef();return e.current||(e.current=zustand.createStore()(immer.immer((o,n)=>({...Y,...r,...fe(o),reset:()=>({...Y,...r})})))),jsxRuntime.jsx(A.Provider,{value:e.current,children:t})},F=t=>{let r=react.useContext(A);if(!r)throw new Error("Missing MapStoreProvider");return zustand.useStore(r,t)};function Je({state:t,setFeatures:r}){let e=invariant.getType(t);if(e==="MultiPoint")r(invariant.getCoords(t).map(o=>({id:toolkit.nanoid(),...helpers.point(o)})));else if(e==="MultiLineString")r(invariant.getCoords(t).map(o=>({id:toolkit.nanoid(),...helpers.lineString(o)})));else if(e==="MultiPolygon")r(invariant.getCoords(t).map(o=>({id:toolkit.nanoid(),...helpers.polygon(o)})));else if(["Point","LineString","Polygon"].includes(e))r([{id:toolkit.nanoid(),...helpers.feature(t)}]);else if(e==="GeometryCollection"){let o=[];meta.flattenEach(t,n=>o.push({id:toolkit.nanoid(),...n})),r(o);}}var X=Je;function Ie(t={}){he__default.default.Icon.Default.mergeOptions({iconUrl:Oe__default.default,iconRetinaUrl:Xe__default.default,shadowUrl:Le__default.default,...t});}var Ze=Ie;function Ve(t){return t&&invariant.getCoord(Be__default.default(ve__default.default(t)))}var L=Ve;function Re(t){let r=bbox.bbox(t);return [[r[1],r[0]],[r[3],r[2]]]}var I=Re;function Ae({state:t,config:{zoomToFeature:r},map:e}){let o=invariant.getGeom(t);if(geojsonValidation.isPoint(o)){if(r){let n=I(circle.circle(t,.25,{steps:4}));e.fitBounds(n,{animate:!1});}else e.panTo(L(t),{animate:!1});return}if(geojsonValidation.isGeoJSONObject(o))if(r){let n=I(t);e.fitBounds(n,{animate:!1});}else e.panTo(L(pointOnFeature.pointOnFeature(t)));}var N=Ae;function Ke(){let t=reactLeaflet.useMap(),[r,e,o,n,p,s,d,c,U,i,f]=F(a=>[a.state,a.$wire,a.config.geomType,a.config.latitudeField,a.config.longitudeField,a.config.drawField,a.config.zoomToFeature,W.selectAll(a),a.updateFeature,a.setFeatures,a.removeFeature]);return react.useEffect(()=>{r&&(X({state:r,setFeatures:i}),N({state:r,config:{zoomToFeature:d},map:t}));},[]),reactUse.useUpdateEffect(()=>{if(c?.length){if(["Point","LineString","Polygon"].includes(o)&&c?.length===1){let a=invariant.getGeom(lodash.last(c));if(o==="Point"){let l=invariant.getCoord(a);n&&e.set(n,l[1],!1),p&&e.set(p,l[0],!1);}s&&e.set(s,JSON.stringify(a),!1);}else if(o==="MultiPoint"){let a=invariant.getGeom(helpers.multiPoint(lodash.map(c,l=>invariant.getCoord(l))));s&&e.set(s,JSON.stringify(a),!1);}else if(o==="MultiLineString"){let a=invariant.getGeom(helpers.multiLineString(lodash.map(c,l=>invariant.getCoords(l))));s&&e.set(s,JSON.stringify(a),!1);}else if(o==="MultiPolygon"){let a=invariant.getGeom(helpers.multiPolygon(lodash.map(c,l=>invariant.getCoords(l))));s&&e.set(s,JSON.stringify(a),!1);}else if(o==="GeometryCollection"){let a=invariant.getGeom(helpers.geometryCollection(lodash.map(c,l=>invariant.getGeom(l))));s&&e.set(s,JSON.stringify(a),!1);}}else s&&e.set(s,"",!1);},[JSON.stringify(c)]),c?.map((a,l)=>jsxRuntime.jsx(g,{data:a,eventHandlers:{"pm:update":({layer:m,target:y})=>{meta.featureEach(y.toGeoJSON(),(u,C)=>{U({id:u.id,changes:u});});},"pm:cut":m=>{t.removeLayer(m.layer);let y=lodash.get(m,"originalLayer.feature.id");f(y);let u=invariant.getType(m.layer.toGeoJSON()),C=invariant.getGeom(u===o?m.layer.toGeoJSON():m.originalLayer.toGeoJSON());X({state:C,setFeatures:i});}}},l))}var et=Ke;var w=core.createControlComponent(function(r){return new he.Control.FullScreen(r)});function nt(t){let{type:r,popupTemplate:e,...o}=t,n=e?lodash.isString(e)?{template:e}:e:{};if(r==="wms"){let p={url:"",format:"image/png",transparent:!0,...o};return jsxRuntime.jsx(reactLeaflet.WMSTileLayer,{...p})}if(r==="geojson"){if(o.data){let p={data:lodash.isString(o.data)?JSON.parse(o.data):o.data,pmIgnore:!0,onEachFeature:(s,d)=>{e&&d.bindPopup(()=>server.renderToString(jsxRuntime.jsx(O,{data:s?.properties,...n})));}};return jsxRuntime.jsx(g,{...p})}if(o.dataUrl){let p={dataUrl:o.dataUrl,pmIgnore:!0,onEachFeature:(s,d)=>{e&&d.bindPopup(()=>server.renderToString(jsxRuntime.jsx(O,{data:s?.properties,...n})));}};return jsxRuntime.jsx(V,{...p})}}return null}var j=nt;var ft={zoomControl:reactLeaflet.ZoomControl,layersControl:reactLeaflet.LayersControl,drawControl:reactLeafletGeomanV2.GeomanControls,attributionControl:reactLeaflet.AttributionControl,scaleControl:reactLeaflet.ScaleControl,fullscreenControl:w},yt={drawMarker:!0,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!1,drawRectangle:!1,drawPolygon:!1,drawText:!1,editMode:!0,dragMode:!1,cutPolygon:!1,removalMode:!0,rotateMode:!1};function gt(){let[t,r,e,o]=F(i=>[i.config.geomType,i.config.layers,i.config.baseLayers,i.config.controls]),[n,p,s]=F(i=>[i.addFeature,i.removeFeature,i.removeFeatures]),d=i=>{i.target.removeLayer(i.layer),["Point","LineString","Polygon"].includes(t)&&s(),n(i.layer.toGeoJSON());},c=({layer:i,target:f})=>{let a=i.feature.id;a&&p(a);};return react.useMemo(()=>lodash.map(o,(i,f)=>{let a=ft[f];if(!i||i?.enabled==!1||!a)return null;let l={...i},m=null;return f==="layersControl"&&(m=jsxRuntime.jsxs(react.Fragment,{children:[e?.map(({selected:y=!1,title:u="None",...C},M)=>jsxRuntime.jsx(reactLeaflet.LayersControl.BaseLayer,{name:u,checked:y,children:jsxRuntime.jsx(reactLeaflet.TileLayer,{url:"",...C})},M)),r?.map(({selected:y=!1,title:u="None",...C},M)=>jsxRuntime.jsx(reactLeaflet.LayersControl.Overlay,{name:u,checked:y,children:jsxRuntime.jsx(j,{...C})},M))]})),f==="drawControl"&&(l={...l,options:yt},["Point","MultiPoint"].includes(t)?l.options={...l.options,drawMarker:!0,editMode:!0,removalMode:!0}:["LineString","MultiLineString"].includes(t)?l.options={...l.options,drawPolyline:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:["Polygon","MultiPolygon"].includes(t)?l.options={...l.options,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:l.options={...l.options,drawMarker:!0,drawCircle:!0,drawPolyline:!0,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0},l.onCreate=d,l.onMapRemove=c),jsxRuntime.jsx(a,{...l,children:m},f)}).filter(i=>i),[JSON.stringify(o)]).map(i=>i)}var bt=gt;

exports.ControlManager = bt;
exports.FeatureManager = et;
exports.FullscreenControl = w;
exports.GeoJSON = g;
exports.GeoJSONAjax = V;
exports.MapStoreProvider = ye;
exports.PopupTemplate = O;
exports.featuresSelectors = W;
exports.setDefaultIcon = Ze;
exports.setFeaturesByState = X;
exports.toBounds = I;
exports.toLatLng = L;
exports.useMapStore = F;
exports.zoomToFeatureByState = N;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map