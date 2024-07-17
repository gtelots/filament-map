'use strict';

var core = require('@react-leaflet/core');
var L = require('leaflet');
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
var MarkerIcon = require('leaflet/dist/images/marker-icon.png');
var MarkerIcon2x = require('leaflet/dist/images/marker-icon-2x.png');
var MarkerShadowIcon = require('leaflet/dist/images/marker-shadow.png');
var center = require('@turf/center');
var flip = require('@turf/flip');
var bbox = require('@turf/bbox');
var reactLeafletGeomanV2 = require('react-leaflet-geoman-v2');
require('leaflet.fullscreen');
require('leaflet.fullscreen/Control.FullScreen.css');
var server = require('react-dom/server');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var L__default = /*#__PURE__*/_interopDefault(L);
var MarkerIcon__default = /*#__PURE__*/_interopDefault(MarkerIcon);
var MarkerIcon2x__default = /*#__PURE__*/_interopDefault(MarkerIcon2x);
var MarkerShadowIcon__default = /*#__PURE__*/_interopDefault(MarkerShadowIcon);
var center__default = /*#__PURE__*/_interopDefault(center);
var flip__default = /*#__PURE__*/_interopDefault(flip);

// src/components/GeoJSON.tsx
var GeoJSON = core.createPathComponent(
  function createGeoJSON({ data, ...options }, ctx) {
    const geoJSON = new L.GeoJSON(data, options);
    return core.createElementObject(
      geoJSON,
      core.extendContext(ctx, { overlayContainer: geoJSON })
    );
  },
  function updateGeoJSON(layer, props, prevProps) {
    if (props.data !== prevProps.data) {
      layer.clearLayers().addData(props.data);
    }
    if (props.style !== prevProps.style) {
      if (props.style == null) {
        layer.resetStyle();
      } else {
        layer.setStyle(props.style);
      }
    }
  }
);
var tpl = (str, data) => str ? lodash.template(str, { interpolate: /{{([\s\S]+?)}}/g })(data) : "";
function PopupTemplate(props) {
  const { template: template2, heading, content, data } = props;
  if (template2) return /* @__PURE__ */ jsxRuntime.jsx("div", { dangerouslySetInnerHTML: { __html: tpl(template2, data) } });
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pc-heading", children: tpl(heading, data) }),
    /* @__PURE__ */ jsxRuntime.jsx("hr", {}),
    lodash.isArray(content) ? /* @__PURE__ */ jsxRuntime.jsx("div", { children: content?.map((c, k) => /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "pc-content-label", children: [
        c.label,
        ": "
      ] }),
      lodash.get(data, c.value)
    ] }, k)) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { dangerouslySetInnerHTML: { __html: tpl(content, data) } })
  ] });
}
var PopupTemplate_default = PopupTemplate;
function GeoJSONAjax(props) {
  const { dataUrl, children, ...opts } = props;
  const [enabled, setEnabled] = react.useState(false);
  const [data, setData] = react.useState(null);
  react.useEffect(() => {
    if (enabled && dataUrl) {
      fetch(dataUrl).then((resp) => resp.json()).then((resp) => {
        setData(resp);
      });
    }
  }, [enabled, dataUrl]);
  return /* @__PURE__ */ jsxRuntime.jsx(GeoJSON, { ...opts, data, eventHandlers: {
    "add": (event) => {
      setEnabled(true);
    },
    "remove": (event) => {
      setEnabled(false);
    }
  }, children: lodash.isFunction(children) && data && children(data) });
}
var GeoJSONAjax_default = GeoJSONAjax;
var featuresAdapter = toolkit.createEntityAdapter();
var featuresSelectors = featuresAdapter.getSelectors((state) => state);
var initialState = featuresAdapter.getInitialState({
  $wire: null,
  $watch: null,
  state: null,
  config: {}
});
var actions = (set, get3) => ({
  addFeature: (feature2) => set((state) => {
    featuresAdapter.addOne(state, { id: toolkit.nanoid(), ...feature2 });
  }),
  updateFeature: (payload) => set((state) => {
    featuresAdapter.updateOne(state, payload);
  }),
  removeFeature: (id) => set((state) => {
    featuresAdapter.removeOne(state, id);
  }),
  setFeatures: (features) => set((state) => {
    featuresAdapter.setAll(state, features);
  }),
  removeFeatures: () => set((state) => {
    featuresAdapter.removeAll(state);
  })
});
var MapStoreContext = react.createContext(null);
var MapStoreProvider = ({ children, value }) => {
  const storeRef = react.useRef();
  if (!storeRef.current) {
    storeRef.current = zustand.createStore()(immer.immer((set, get3) => ({
      ...initialState,
      ...value,
      ...actions(set),
      reset: () => ({
        ...initialState,
        ...value
      })
    })));
  }
  return /* @__PURE__ */ jsxRuntime.jsx(MapStoreContext.Provider, { value: storeRef.current, children });
};
var useMapStore = (selector) => {
  const store = react.useContext(MapStoreContext);
  if (!store) {
    throw new Error("Missing MapStoreProvider");
  }
  return zustand.useStore(store, selector);
};
function setFeaturesByState({ state, setFeatures }) {
  const type = invariant.getType(state);
  if (type === "MultiPoint") {
    setFeatures(
      invariant.getCoords(state).map((coord) => ({
        id: toolkit.nanoid(),
        ...helpers.point(coord)
      }))
    );
  } else if (type === "MultiLineString") {
    setFeatures(
      invariant.getCoords(state).map((coord) => ({
        id: toolkit.nanoid(),
        ...helpers.lineString(coord)
      }))
    );
  } else if (type === "MultiPolygon") {
    setFeatures(
      invariant.getCoords(state).map((coord) => ({
        id: toolkit.nanoid(),
        ...helpers.polygon(coord)
      }))
    );
  } else if (["Point", "LineString", "Polygon"].includes(type)) {
    setFeatures([
      {
        id: toolkit.nanoid(),
        ...helpers.feature(state)
      }
    ]);
  } else if (type === "GeometryCollection") {
    let newFeatures = [];
    meta.flattenEach(state, (currentFeature) => newFeatures.push({ id: toolkit.nanoid(), ...currentFeature }));
    setFeatures(newFeatures);
  }
}
var setFeaturesByState_default = setFeaturesByState;
function setDefaultIcon(options = {}) {
  L__default.default.Icon.Default.mergeOptions({
    iconUrl: MarkerIcon__default.default,
    iconRetinaUrl: MarkerIcon2x__default.default,
    shadowUrl: MarkerShadowIcon__default.default,
    ...options
  });
}
var setDefaultIcon_default = setDefaultIcon;
function toLatLng(data) {
  if (!data) return data;
  return invariant.getCoord(flip__default.default(center__default.default(data)));
}
var toLatLng_default = toLatLng;
function toBounds(data) {
  const arr = bbox.bbox(data);
  return [
    [arr[1], arr[0]],
    [arr[3], arr[2]]
  ];
}
var toBounds_default = toBounds;

// src/utils/zoomToFeatureByState.ts
function zoomToFeatureByState({
  state,
  config: { zoomToFeature },
  map
}) {
  const geometry = invariant.getGeom(state);
  if (geojsonValidation.isPoint(geometry)) {
    if (zoomToFeature) {
      const bounds = toBounds_default(circle.circle(state, 0.25, { steps: 4 }));
      map.fitBounds(bounds, { animate: false });
    } else {
      map.panTo(toLatLng_default(state), { animate: false });
    }
    return;
  }
  if (geojsonValidation.isGeoJSONObject(geometry)) {
    if (zoomToFeature) {
      const bounds = toBounds_default(state);
      map.fitBounds(bounds, { animate: false });
    } else {
      map.panTo(toLatLng_default(pointOnFeature.pointOnFeature(state)));
    }
  }
}
var zoomToFeatureByState_default = zoomToFeatureByState;
function FeatureManager() {
  const map = reactLeaflet.useMap();
  const [
    state,
    $wire,
    geomType,
    latitudeField,
    longitudeField,
    drawField,
    zoomToFeature,
    features,
    updateFeature,
    setFeatures,
    removeFeature
  ] = useMapStore((state2) => [
    state2.state,
    state2.$wire,
    state2.config.geomType,
    state2.config.latitudeField,
    state2.config.longitudeField,
    state2.config.drawField,
    state2.config.zoomToFeature,
    featuresSelectors.selectAll(state2),
    state2.updateFeature,
    state2.setFeatures,
    state2.removeFeature
  ]);
  react.useEffect(() => {
    if (!state) return;
    setFeaturesByState_default({
      state,
      setFeatures
    });
    zoomToFeatureByState_default({
      state,
      config: { zoomToFeature },
      map
    });
  }, []);
  reactUse.useUpdateEffect(() => {
    if (features?.length) {
      if (["Point", "LineString", "Polygon"].includes(geomType) && features?.length === 1) {
        const geometry = invariant.getGeom(lodash.last(features));
        if (geomType === "Point") {
          const coords = invariant.getCoord(geometry);
          latitudeField && $wire.set(latitudeField, coords[1], false);
          longitudeField && $wire.set(longitudeField, coords[0], false);
        }
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      } else if (geomType === "MultiPoint") {
        const geometry = invariant.getGeom(helpers.multiPoint(lodash.map(features, (i) => invariant.getCoord(i))));
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      } else if (geomType === "MultiLineString") {
        const geometry = invariant.getGeom(
          helpers.multiLineString(lodash.map(features, (i) => invariant.getCoords(i)))
        );
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      } else if (geomType === "MultiPolygon") {
        const geometry = invariant.getGeom(
          helpers.multiPolygon(lodash.map(features, (i) => invariant.getCoords(i)))
        );
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      } else if (geomType === "GeometryCollection") {
        const geometry = invariant.getGeom(
          helpers.geometryCollection(lodash.map(features, (i) => invariant.getGeom(i)))
        );
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      }
    } else {
      drawField && $wire.set(drawField, "", false);
    }
  }, [JSON.stringify(features)]);
  return features?.map((f, k) => /* @__PURE__ */ jsxRuntime.jsx(
    GeoJSON,
    {
      data: f,
      eventHandlers: {
        "pm:update": ({ layer, target }) => {
          meta.featureEach(target.toGeoJSON(), (feature2, index) => {
            updateFeature({
              id: feature2.id,
              changes: feature2
            });
          });
        },
        "pm:cut": (e) => {
          map.removeLayer(e.layer);
          const id = lodash.get(e, "originalLayer.feature.id");
          removeFeature(id);
          const type = invariant.getType(e.layer.toGeoJSON());
          const geometry = invariant.getGeom(
            type === geomType ? e.layer.toGeoJSON() : e.originalLayer.toGeoJSON()
          );
          setFeaturesByState_default({
            state: geometry,
            setFeatures
          });
        }
      }
    },
    k
  ));
}
var FeatureManager_default = FeatureManager;
var FullscreenControl = core.createControlComponent(function createFullscreenControl(props) {
  return new L.Control.FullScreen(props);
});
function DynamicLayer(props) {
  const { type, popupTemplate, ...other } = props;
  let tplPopupProps = popupTemplate ? lodash.isString(popupTemplate) ? { template: popupTemplate } : popupTemplate : {};
  if (type === "wms") {
    const opts = {
      url: "",
      format: "image/png",
      transparent: true,
      ...other
    };
    return /* @__PURE__ */ jsxRuntime.jsx(reactLeaflet.WMSTileLayer, { ...opts });
  }
  if (type === "geojson") {
    if (other.data) {
      const opts = {
        data: lodash.isString(other.data) ? JSON.parse(other.data) : other.data,
        pmIgnore: true,
        onEachFeature: (feature2, layer) => {
          popupTemplate && layer.bindPopup(() => {
            return server.renderToString(
              /* @__PURE__ */ jsxRuntime.jsx(PopupTemplate_default, { data: feature2?.properties, ...tplPopupProps })
            );
          });
        }
      };
      return /* @__PURE__ */ jsxRuntime.jsx(GeoJSON, { ...opts });
    }
    if (other.dataUrl) {
      const opts = {
        dataUrl: other.dataUrl,
        pmIgnore: true,
        onEachFeature: (feature2, layer) => {
          popupTemplate && layer.bindPopup(() => {
            return server.renderToString(
              /* @__PURE__ */ jsxRuntime.jsx(PopupTemplate_default, { data: feature2?.properties, ...tplPopupProps })
            );
          });
        }
      };
      return /* @__PURE__ */ jsxRuntime.jsx(GeoJSONAjax_default, { ...opts });
    }
  }
  return null;
}
var DynamicLayer_default = DynamicLayer;
var controlComponents = {
  zoomControl: reactLeaflet.ZoomControl,
  layersControl: reactLeaflet.LayersControl,
  drawControl: reactLeafletGeomanV2.GeomanControls,
  attributionControl: reactLeaflet.AttributionControl,
  scaleControl: reactLeaflet.ScaleControl,
  fullscreenControl: FullscreenControl
};
var defaultDrawControlOptions = {
  drawMarker: true,
  drawCircle: false,
  drawCircleMarker: false,
  drawPolyline: false,
  drawRectangle: false,
  drawPolygon: false,
  drawText: false,
  editMode: true,
  dragMode: false,
  cutPolygon: false,
  removalMode: true,
  rotateMode: false
};
function ControlManager() {
  const [geomType, layers, baseLayers, _controls] = useMapStore((state) => [
    state.config.geomType,
    state.config.layers,
    state.config.baseLayers,
    state.config.controls
  ]);
  const [addFeature, removeFeature, removeFeatures] = useMapStore((state) => [
    state.addFeature,
    state.removeFeature,
    state.removeFeatures
  ]);
  const handleCreate = (e) => {
    e.target.removeLayer(e.layer);
    if (["Point", "LineString", "Polygon"].includes(geomType)) removeFeatures();
    addFeature(e.layer.toGeoJSON());
  };
  const handleRemove = ({ layer, target }) => {
    const id = layer.feature.id;
    id && removeFeature(id);
  };
  const controls = react.useMemo(() => lodash.map(_controls, (opts, name) => {
    const Component = controlComponents[name];
    if (!opts || opts?.enabled == false || !Component) return null;
    let options = { ...opts };
    let children = null;
    if (name === "layersControl") {
      children = /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, { children: [
        baseLayers?.map(
          ({ selected = false, title = "None", ...layerProps }, k) => /* @__PURE__ */ jsxRuntime.jsx(reactLeaflet.LayersControl.BaseLayer, { name: title, checked: selected, children: /* @__PURE__ */ jsxRuntime.jsx(reactLeaflet.TileLayer, { url: "", ...layerProps }) }, k)
        ),
        layers?.map(
          ({ selected = false, title = "None", ...layerProps }, k) => /* @__PURE__ */ jsxRuntime.jsx(reactLeaflet.LayersControl.Overlay, { name: title, checked: selected, children: /* @__PURE__ */ jsxRuntime.jsx(DynamicLayer_default, { ...layerProps }) }, k)
        )
      ] });
    }
    if (name === "drawControl") {
      options = {
        ...options,
        options: defaultDrawControlOptions
      };
      if (["Point", "MultiPoint"].includes(geomType)) {
        options.options = {
          ...options.options,
          drawMarker: true,
          editMode: true,
          removalMode: true
        };
      } else if (["LineString", "MultiLineString"].includes(geomType)) {
        options.options = {
          ...options.options,
          drawPolyline: true,
          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true
        };
      } else if (["Polygon", "MultiPolygon"].includes(geomType)) {
        options.options = {
          ...options.options,
          drawRectangle: true,
          drawPolygon: true,
          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true
        };
      } else {
        options.options = {
          ...options.options,
          drawMarker: true,
          drawCircle: true,
          drawPolyline: true,
          drawRectangle: true,
          drawPolygon: true,
          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true
        };
      }
      options.onCreate = handleCreate;
      options.onMapRemove = handleRemove;
    }
    return /* @__PURE__ */ jsxRuntime.jsx(Component, { ...options, children }, name);
  }).filter((v) => v), [JSON.stringify(_controls)]);
  return controls.map((control) => control);
}
var ControlManager_default = ControlManager;

exports.ControlManager = ControlManager_default;
exports.FeatureManager = FeatureManager_default;
exports.FullscreenControl = FullscreenControl;
exports.GeoJSON = GeoJSON;
exports.GeoJSONAjax = GeoJSONAjax_default;
exports.MapStoreProvider = MapStoreProvider;
exports.PopupTemplate = PopupTemplate_default;
exports.featuresSelectors = featuresSelectors;
exports.setDefaultIcon = setDefaultIcon_default;
exports.setFeaturesByState = setFeaturesByState_default;
exports.toBounds = toBounds_default;
exports.toLatLng = toLatLng_default;
exports.useMapStore = useMapStore;
exports.zoomToFeatureByState = zoomToFeatureByState_default;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map