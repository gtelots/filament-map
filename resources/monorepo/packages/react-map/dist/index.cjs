'use strict';

var core = require('@react-leaflet/core');
var H = require('leaflet');
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
var Ze = require('leaflet/dist/images/marker-icon.png');
var ve = require('leaflet/dist/images/marker-icon-2x.png');
var Me = require('leaflet/dist/images/marker-shadow.png');
var We = require('@turf/center');
var Ne = require('@turf/flip');
var bbox = require('@turf/bbox');
var reactLeafletGeomanV2 = require('react-leaflet-geoman-v2');
require('leaflet.fullscreen');
require('leaflet.fullscreen/Control.FullScreen.css');
var server = require('react-dom/server');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var H__default = /*#__PURE__*/_interopDefault(H);
var Ze__default = /*#__PURE__*/_interopDefault(Ze);
var ve__default = /*#__PURE__*/_interopDefault(ve);
var Me__default = /*#__PURE__*/_interopDefault(Me);
var We__default = /*#__PURE__*/_interopDefault(We);
var Ne__default = /*#__PURE__*/_interopDefault(Ne);

var b=core.createPathComponent(function({data:r,...t},e){let a=new H.GeoJSON(r,t);return core.createElementObject(a,core.extendContext(e,{overlayContainer:a}))},function(r,t,e){t.data!==e.data&&r.clearLayers().addData(t.data),t.style!==e.style&&(t.style==null?r.resetStyle():r.setStyle(t.style));});var B=(o,r)=>o?lodash.template(o,{interpolate:/{{([\s\S]+?)}}/g})(r):"";function ae(o){let{template:r,heading:t,content:e,data:a}=o;return r?jsxRuntime.jsx("div",{dangerouslySetInnerHTML:{__html:B(r,a)}}):jsxRuntime.jsxs("div",{children:[jsxRuntime.jsx("div",{className:"pc-heading",children:B(t,a)}),jsxRuntime.jsx("hr",{}),lodash.isArray(e)?jsxRuntime.jsx("div",{children:e?.map((s,i)=>jsxRuntime.jsxs("div",{children:[jsxRuntime.jsxs("span",{className:"pc-content-label",children:[s.label,": "]}),lodash.get(a,s.value)]},i))}):jsxRuntime.jsx("div",{dangerouslySetInnerHTML:{__html:B(e,a)}})]})}var V=ae;function se(o){let{dataUrl:r,children:t,...e}=o,[a,s]=react.useState(!1),[i,f]=react.useState(null);return react.useEffect(()=>{a&&r&&fetch(r).then(d=>d.json()).then(d=>{f(d);});},[a,r]),jsxRuntime.jsx(b,{...e,data:i,eventHandlers:{add:d=>{s(!0);},remove:d=>{s(!1);}},children:lodash.isFunction(t)&&i&&t(i)})}var W=se;var G=toolkit.createEntityAdapter(),N=G.getSelectors(o=>o),Q=G.getInitialState({$wire:null,$watch:null,state:null,config:{}}),Ge=(o,r)=>({addFeature:t=>o(e=>{G.addOne(e,{id:toolkit.nanoid(),...t});}),updateFeature:t=>o(e=>{G.updateOne(e,t);}),removeFeature:t=>o(e=>{G.removeOne(e,t);}),setFeatures:t=>o(e=>{G.setAll(e,t);}),removeFeatures:()=>o(t=>{G.removeAll(t);})}),T=react.createContext(null),Ce=({children:o,value:r})=>{let t=react.useRef();return t.current||(t.current=zustand.createStore()(immer.immer((e,a)=>({...Q,...r,...Ge(e),reset:()=>({...Q,...r})})))),jsxRuntime.jsx(T.Provider,{value:t.current,children:o})},O=o=>{let r=react.useContext(T);if(!r)throw new Error("Missing MapStoreProvider");return zustand.useStore(r,o)};function Xe({state:o,setFeatures:r}){let t=invariant.getType(o);if(t==="MultiPoint")r(invariant.getCoords(o).map(e=>({id:toolkit.nanoid(),...helpers.point(e)})));else if(t==="MultiLineString")r(invariant.getCoords(o).map(e=>({id:toolkit.nanoid(),...helpers.lineString(e)})));else if(t==="MultiPolygon")r(invariant.getCoords(o).map(e=>({id:toolkit.nanoid(),...helpers.polygon(e)})));else if(["Point","LineString","Polygon"].includes(t))r([{id:toolkit.nanoid(),...helpers.feature(o)}]);else if(t==="GeometryCollection"){let e=[];meta.flattenEach(o,a=>e.push({id:toolkit.nanoid(),...a})),r(e);}}var X=Xe;function Be(o={}){H__default.default.Icon.Default.mergeOptions({iconUrl:Ze__default.default,iconRetinaUrl:ve__default.default,shadowUrl:Me__default.default,...o});}var Re=Be;function we(o){return o&&invariant.getCoord(Ne__default.default(We__default.default(o)))}var I=we;function Ue(o){let r=bbox.bbox(o);return [[r[1],r[0]],[r[3],r[2]]]}var Z=Ue;function Te({state:o,config:{zoomToFeature:r},map:t}){let e=invariant.getGeom(o);if(geojsonValidation.isPoint(e)){if(r){let a=Z(circle.circle(o,.25,{steps:4}));t.fitBounds(a,{animate:!1});}else t.panTo(I(o),{animate:!1});return}if(geojsonValidation.isGeoJSONObject(e))if(r){let a=Z(o);t.fitBounds(a,{animate:!1});}else t.panTo(I(pointOnFeature.pointOnFeature(o)));}var P=Te;function rt(){let o=reactLeaflet.useMap(),[r,t,e,a,s,i,f,d,k,l,g,c,m,F,x]=O(n=>[n.state,n.$wire,n.config.geomType,n.config.latitudeField,n.config.longitudeField,n.config.drawField,n.config.zoomToFeature,n.config.markerOptions,n.config.polylineOptions,n.config.polygonOptions,n.config.rectangleOptions,N.selectAll(n),n.updateFeature,n.setFeatures,n.removeFeature]);return react.useEffect(()=>{r&&(X({state:r,setFeatures:F}),P({state:r,config:{zoomToFeature:f},map:o}));},[]),reactUse.useUpdateEffect(()=>{if(c?.length){if(["Point","LineString","Polygon"].includes(e)&&c?.length===1){let n=invariant.getGeom(lodash.last(c));if(e==="Point"){let p=invariant.getCoord(n);a&&t.set(a,p[1],!1),s&&t.set(s,p[0],!1);}i&&t.set(i,JSON.stringify(n),!1);}else if(e==="MultiPoint"){let n=invariant.getGeom(helpers.multiPoint(lodash.map(c,p=>invariant.getCoord(p))));i&&t.set(i,JSON.stringify(n),!1);}else if(e==="MultiLineString"){let n=invariant.getGeom(helpers.multiLineString(lodash.map(c,p=>invariant.getCoords(p))));i&&t.set(i,JSON.stringify(n),!1);}else if(e==="MultiPolygon"){let n=invariant.getGeom(helpers.multiPolygon(lodash.map(c,p=>invariant.getCoords(p))));i&&t.set(i,JSON.stringify(n),!1);}else if(e==="GeometryCollection"){let n=invariant.getGeom(helpers.geometryCollection(lodash.map(c,p=>invariant.getGeom(p))));i&&t.set(i,JSON.stringify(n),!1);}}else i&&t.set(i,"",!1);},[JSON.stringify(c)]),c?.map((n,p)=>jsxRuntime.jsx(b,{data:n,pointToLayer:(u,S)=>{let y={...d};return y.icon&&(y.icon=H__default.default.icon(y.icon)),H__default.default.marker(S,y)},style:()=>({...k,...l,...g}),eventHandlers:{"pm:update":({layer:u,target:S})=>{meta.featureEach(S.toGeoJSON(),(y,A)=>{m({id:y.id,changes:y});});},"pm:cut":u=>{o.removeLayer(u.layer);let S=lodash.get(u,"originalLayer.feature.id");x(S);let y=invariant.getType(u.layer.toGeoJSON()),A=invariant.getGeom(y===e?u.layer.toGeoJSON():u.originalLayer.toGeoJSON());X({state:A,setFeatures:F});}}},p))}var nt=rt;var U=core.createControlComponent(function(r){return new H.Control.FullScreen(r)});function ct(o){let{type:r,popupTemplate:t,...e}=o,a=t?lodash.isString(t)?{template:t}:t:{};if(r==="wms"){let s={url:"",format:"image/png",transparent:!0,...e};return jsxRuntime.jsx(reactLeaflet.WMSTileLayer,{...s})}if(r==="geojson"){let s={pointToLayer:(i,f)=>{let d={...e.markerOptions};return d.icon&&(d.icon=H__default.default.icon(d.icon)),H__default.default.marker(f,d)},style:i=>({...e.polylineOptions,...e.polygonOptions,...e.rectangleOptions}),onEachFeature:(i,f)=>{t&&f.bindPopup(()=>server.renderToString(jsxRuntime.jsx(V,{data:i?.properties,...a})));}};if(e.data)return s={...s,data:lodash.isString(e.data)?JSON.parse(e.data):e.data},jsxRuntime.jsx(b,{...s});if(e.dataUrl)return s={...s,dataUrl:e.dataUrl},jsxRuntime.jsx(W,{...s})}return null}var $=ct;var Ct={zoomControl:reactLeaflet.ZoomControl,layersControl:reactLeaflet.LayersControl,drawControl:reactLeafletGeomanV2.GeomanControls,attributionControl:reactLeaflet.AttributionControl,scaleControl:reactLeaflet.ScaleControl,fullscreenControl:U},Ot={drawMarker:!1,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!1,drawRectangle:!1,drawPolygon:!1,drawText:!1,editMode:!0,dragMode:!1,cutPolygon:!1,removalMode:!0,rotateMode:!1};function Ft(){let[o,r,t,e]=O(l=>[l.config.geomType,l.config.layers,l.config.baseLayers,l.config.controls]),[a,s,i]=O(l=>[l.addFeature,l.removeFeature,l.removeFeatures]),f=l=>{l.target.removeLayer(l.layer),["Point","LineString","Polygon"].includes(o)&&i(),a(l.layer.toGeoJSON());},d=({layer:l,target:g})=>{let c=l.feature.id;c&&s(c);};return react.useMemo(()=>lodash.map(e,(l,g)=>{let c=Ct[g];if(!l||l?.enabled==!1||!c)return null;let m={...l},F=null;return g==="layersControl"&&(F=jsxRuntime.jsxs(react.Fragment,{children:[t?.map(({selected:x=!1,title:n="None",...p},u)=>jsxRuntime.jsx(reactLeaflet.LayersControl.BaseLayer,{name:n,checked:x,children:jsxRuntime.jsx(reactLeaflet.TileLayer,{url:"",...p})},u)),r?.map(({selected:x=!1,title:n="None",...p},u)=>jsxRuntime.jsx(reactLeaflet.LayersControl.Overlay,{name:n,checked:x,children:jsxRuntime.jsx($,{...p})},u))]})),g==="drawControl"&&(m={...m,options:Ot},["Point","MultiPoint"].includes(o)?m.options={...m.options,drawMarker:!0,editMode:!0,removalMode:!0}:["LineString","MultiLineString"].includes(o)?m.options={...m.options,drawPolyline:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:["Polygon","MultiPolygon"].includes(o)?m.options={...m.options,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:m.options={...m.options,drawMarker:!0,drawCircle:!0,drawPolyline:!0,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0},m.onCreate=f,m.onMapRemove=d),jsxRuntime.jsx(c,{...m,children:F},g)}).filter(l=>l),[JSON.stringify(e)]).map(l=>l)}var xt=Ft;

exports.ControlManager = xt;
exports.FeatureManager = nt;
exports.FullscreenControl = U;
exports.GeoJSON = b;
exports.GeoJSONAjax = W;
exports.MapStoreProvider = Ce;
exports.PopupTemplate = V;
exports.featuresSelectors = N;
exports.setDefaultIcon = Re;
exports.setFeaturesByState = X;
exports.toBounds = Z;
exports.toLatLng = I;
exports.useMapStore = O;
exports.zoomToFeatureByState = P;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map