'use strict';

var core = require('@react-leaflet/core');
var E = require('leaflet');
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
var ve = require('leaflet/dist/images/marker-icon.png');
var Ne = require('leaflet/dist/images/marker-icon-2x.png');
var Re = require('leaflet/dist/images/marker-shadow.png');
var ke = require('@turf/center');
var Be = require('@turf/flip');
var bbox = require('@turf/bbox');
var reactLeafletGeomanV2 = require('react-leaflet-geoman-v2');
require('leaflet.fullscreen');
require('leaflet.fullscreen/Control.FullScreen.css');
var server = require('react-dom/server');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var E__default = /*#__PURE__*/_interopDefault(E);
var ve__default = /*#__PURE__*/_interopDefault(ve);
var Ne__default = /*#__PURE__*/_interopDefault(Ne);
var Re__default = /*#__PURE__*/_interopDefault(Re);
var ke__default = /*#__PURE__*/_interopDefault(ke);
var Be__default = /*#__PURE__*/_interopDefault(Be);

var y=core.createPathComponent(function({data:r,...t},e){let a=new E.GeoJSON(r,t);return core.createElementObject(a,core.extendContext(e,{overlayContainer:a}))},function(r,t,e){t.data!==e.data&&r.clearLayers().addData(t.data),t.style!==e.style&&(t.style==null?r.resetStyle():r.setStyle(t.style));});var N=(o,r)=>o?lodash.template(o,{interpolate:/{{([\s\S]+?)}}/g})(r):"";function ie(o){let{template:r,heading:t,content:e,data:a}=o;return r?jsxRuntime.jsx("div",{dangerouslySetInnerHTML:{__html:N(r,a)}}):jsxRuntime.jsxs("div",{children:[jsxRuntime.jsx("div",{className:"pc-heading",children:N(t,a)}),jsxRuntime.jsx("hr",{}),lodash.isArray(e)?jsxRuntime.jsx("div",{children:e?.map((p,i)=>jsxRuntime.jsxs("div",{children:[jsxRuntime.jsxs("span",{className:"pc-content-label",children:[p.label,": "]}),lodash.get(a,p.value)]},i))}):jsxRuntime.jsx("div",{dangerouslySetInnerHTML:{__html:N(e,a)}})]})}var W=ie;function pe(o){let{dataUrl:r,children:t,...e}=o,[a,p]=react.useState(!1),[i,u]=react.useState(null);return react.useEffect(()=>{a&&r&&fetch(r).then(d=>d.json()).then(d=>{u(d);});},[a,r]),jsxRuntime.jsx(y,{...e,data:i,eventHandlers:{add:d=>{p(!0);},remove:d=>{p(!1);}},children:lodash.isFunction(t)&&i&&t(i)})}var P=pe;var b=toolkit.createEntityAdapter(),Z=b.getSelectors(o=>o),z=b.getInitialState({$wire:null,$watch:null,state:null,config:{}}),Oe=(o,r)=>({addFeature:t=>o(e=>{b.addOne(e,{id:toolkit.nanoid(),...t});}),updateFeature:t=>o(e=>{b.updateOne(e,t);}),removeFeature:t=>o(e=>{b.removeOne(e,t);}),setFeatures:t=>o(e=>{b.setAll(e,t);}),removeFeatures:()=>o(t=>{b.removeAll(t);})}),T=react.createContext(null),Fe=({children:o,value:r})=>{let t=react.useRef();return t.current||(t.current=zustand.createStore()(immer.immer((e,a)=>({...z,...r,...Oe(e),reset:()=>({...z,...r})})))),jsxRuntime.jsx(T.Provider,{value:t.current,children:o})},O=o=>{let r=react.useContext(T);if(!r)throw new Error("Missing MapStoreProvider");return zustand.useStore(r,o)};function Me({state:o,setFeatures:r}){let t=invariant.getType(o);if(t==="MultiPoint")r(invariant.getCoords(o).map(e=>({id:toolkit.nanoid(),...helpers.point(e)})));else if(t==="MultiLineString")r(invariant.getCoords(o).map(e=>({id:toolkit.nanoid(),...helpers.lineString(e)})));else if(t==="MultiPolygon")r(invariant.getCoords(o).map(e=>({id:toolkit.nanoid(),...helpers.polygon(e)})));else if(["Point","LineString","Polygon"].includes(t))r([{id:toolkit.nanoid(),...helpers.feature(o)}]);else if(t==="GeometryCollection"){let e=[];meta.flattenEach(o,a=>e.push({id:toolkit.nanoid(),...a})),r(e);}}var h=Me;function We(o={}){E__default.default.Icon.Default.mergeOptions({iconUrl:ve__default.default,iconRetinaUrl:Ne__default.default,shadowUrl:Re__default.default,...o});}var Pe=We;function Ve(o){return o&&invariant.getCoord(Be__default.default(ke__default.default(o)))}var L=Ve;function Ue(o){let r=bbox.bbox(o);return [[r[1],r[0]],[r[3],r[2]]]}var M=Ue;function He({state:o,config:{zoomToFeature:r},map:t}){let e=invariant.getGeom(o);if(geojsonValidation.isPoint(e)){if(r){let a=M(circle.circle(o,.25,{steps:4}));t.fitBounds(a,{animate:!1});}else t.panTo(L(o),{animate:!1});return}if(geojsonValidation.isGeoJSONObject(e))if(r){let a=M(o);t.fitBounds(a,{animate:!1});}else t.panTo(L(pointOnFeature.pointOnFeature(o)));}var B=He;console.log(123);function nt(){let o=reactLeaflet.useMap(),[r,t,e,a,p,i,u,d,A,l,g,c,m,F,x]=O(n=>[n.state,n.$wire,n.config.geomType,n.config.latitudeField,n.config.longitudeField,n.config.drawField,n.config.zoomToFeature,n.config.markerOptions,n.config.polylineOptions,n.config.polygonOptions,n.config.rectangleOptions,Z.selectAll(n),n.updateFeature,n.setFeatures,n.removeFeature]);react.useEffect(()=>{r&&(h({state:r,setFeatures:F}),B({state:r,config:{zoomToFeature:u},map:o}));},[]),reactUse.useUpdateEffect(()=>{if(c?.length){if(console.log(c),["Point","LineString","Polygon"].includes(e)&&c?.length===1){let n=invariant.getGeom(lodash.last(c));if(e==="Point"){let s=invariant.getCoord(n);a&&t.set(a,s[1],!1),p&&t.set(p,s[0],!1);}i&&t.set(i,JSON.stringify(n),!1);}else if(e==="MultiPoint"){let n=invariant.getGeom(helpers.multiPoint(lodash.map(c,s=>invariant.getCoord(s))));i&&t.set(i,JSON.stringify(n),!1);}else if(e==="MultiLineString"){let n=invariant.getGeom(helpers.multiLineString(lodash.map(c,s=>invariant.getCoords(s))));i&&t.set(i,JSON.stringify(n),!1);}else if(e==="MultiPolygon"){let n=invariant.getGeom(helpers.multiPolygon(lodash.map(c,s=>invariant.getCoords(s))));i&&t.set(i,JSON.stringify(n),!1);}else if(e==="GeometryCollection"){let n=invariant.getGeom(helpers.geometryCollection(lodash.map(c,s=>invariant.getGeom(s))));i&&t.set(i,JSON.stringify(n),!1);}}else i&&t.set(i,"",!1);},[JSON.stringify(c)]);let S={pointToLayer:(n,s)=>{let f={...d};return f.icon&&(f.icon=E__default.default.icon(f.icon)),E__default.default.marker(s,f)},style:()=>({...A,...l,...g}),eventHandlers:{"pm:update":({layer:n,target:s})=>{meta.featureEach(s.toGeoJSON(),(f,Q)=>{m({id:f.id,changes:f});});},"pm:cut":n=>{o.removeLayer(n.layer);let s=lodash.get(n,"originalLayer.feature.id");x(s);let f=invariant.getType(n.layer.toGeoJSON()),Q=invariant.getGeom(f===e?n.layer.toGeoJSON():n.originalLayer.toGeoJSON());h({state:Q,setFeatures:F});}},pane:["Point","MultiPoint"].includes(e)?"stateMarkerPane":"stateOverlayPane"};return jsxRuntime.jsxs(jsxRuntime.Fragment,{children:[jsxRuntime.jsx(reactLeaflet.Pane,{name:"stateOverlayPane",style:{zIndex:450}}),jsxRuntime.jsx(reactLeaflet.Pane,{name:"stateMarkerPane",style:{zIndex:650}}),c?.map((n,s)=>jsxRuntime.jsx(y,{data:n,...S},s))]})}var at=nt;var w=core.createControlComponent(function(r){return new E.Control.FullScreen(r)});function dt(o){let{type:r,popupTemplate:t,...e}=o,a=t?lodash.isString(t)?{template:t}:t:{};if(r==="wms"){let p={url:"",format:"image/png",transparent:!0,...e};return jsxRuntime.jsx(reactLeaflet.WMSTileLayer,{...p})}if(r==="geojson"){let p={pointToLayer:(i,u)=>{let d={...e.markerOptions};return d.icon&&(d.icon=E__default.default.icon(d.icon)),E__default.default.marker(u,d)},style:i=>({...e.polylineOptions,...e.polygonOptions,...e.rectangleOptions}),onEachFeature:(i,u)=>{t&&u.bindPopup(()=>server.renderToString(jsxRuntime.jsx(W,{data:i?.properties,...a})));}};if(e.data)return p={...p,data:lodash.isString(e.data)?JSON.parse(e.data):e.data},jsxRuntime.jsx(y,{...p});if(e.dataUrl)return p={...p,dataUrl:e.dataUrl},jsxRuntime.jsx(P,{...p})}return null}var K=dt;var xt={zoomControl:reactLeaflet.ZoomControl,layersControl:reactLeaflet.LayersControl,drawControl:reactLeafletGeomanV2.GeomanControls,attributionControl:reactLeaflet.AttributionControl,scaleControl:reactLeaflet.ScaleControl,fullscreenControl:w},St={drawMarker:!1,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!1,drawRectangle:!1,drawPolygon:!1,drawText:!1,editMode:!0,dragMode:!1,cutPolygon:!1,removalMode:!0,rotateMode:!1};function It(){let[o,r,t,e]=O(l=>[l.config.geomType,l.config.layers,l.config.baseLayers,l.config.controls]),[a,p,i]=O(l=>[l.addFeature,l.removeFeature,l.removeFeatures]),u=l=>{l.target.removeLayer(l.layer),["Point","LineString","Polygon"].includes(o)&&i(),a(l.layer.toGeoJSON());},d=({layer:l,target:g})=>{let c=l.feature.id;c&&p(c);};return react.useMemo(()=>lodash.map(e,(l,g)=>{let c=xt[g];if(!l||l?.enabled==!1||!c)return null;let m={...l},F=null;return g==="layersControl"&&(F=jsxRuntime.jsxs(react.Fragment,{children:[t?.map(({selected:x=!1,title:S="None",...n},s)=>jsxRuntime.jsx(reactLeaflet.LayersControl.BaseLayer,{name:S,checked:x,children:jsxRuntime.jsx(reactLeaflet.TileLayer,{url:"",...n})},s)),r?.map(({selected:x=!1,title:S="None",...n},s)=>jsxRuntime.jsx(reactLeaflet.LayersControl.Overlay,{name:S,checked:x,children:jsxRuntime.jsx(K,{...n,zIndex:100})},s))]})),g==="drawControl"&&(m={...m,options:St},["Point","MultiPoint"].includes(o)?m.options={...m.options,drawMarker:!0,editMode:!0,removalMode:!0}:["LineString","MultiLineString"].includes(o)?m.options={...m.options,drawPolyline:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:["Polygon","MultiPolygon"].includes(o)?m.options={...m.options,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0}:m.options={...m.options,drawMarker:!0,drawCircle:!0,drawPolyline:!0,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,removalMode:!0,rotateMode:!0},m.onCreate=u,m.onMapRemove=d),jsxRuntime.jsx(c,{...m,children:F},g)}).filter(l=>l),[JSON.stringify(e)]).map(l=>l)}var Ct=It;

exports.ControlManager = Ct;
exports.FeatureManager = at;
exports.FullscreenControl = w;
exports.GeoJSON = y;
exports.GeoJSONAjax = P;
exports.MapStoreProvider = Fe;
exports.PopupTemplate = W;
exports.featuresSelectors = Z;
exports.setDefaultIcon = Pe;
exports.setFeaturesByState = h;
exports.toBounds = M;
exports.toLatLng = L;
exports.useMapStore = O;
exports.zoomToFeatureByState = B;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map