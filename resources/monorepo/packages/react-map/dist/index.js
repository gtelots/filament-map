import { createPathComponent, createElementObject, extendContext, createControlComponent } from '@react-leaflet/core';
import L, { GeoJSON as GeoJSON$1, Control } from 'leaflet';
import { isArray, get, isFunction, last, map, template, isString } from 'lodash';
import { jsx, jsxs } from 'react/jsx-runtime';
import { createContext, useRef, useContext, useState, useEffect, useMemo, Fragment } from 'react';
import { point, lineString, polygon, feature, multiPoint, multiLineString, multiPolygon, geometryCollection } from '@turf/helpers';
import { getType, getCoords, getCoord, getGeom } from '@turf/invariant';
import { flattenEach, featureEach } from '@turf/meta';
import { useMap, LayersControl, TileLayer, WMSTileLayer, ZoomControl, AttributionControl, ScaleControl } from 'react-leaflet';
import { createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useUpdateEffect } from 'react-use';
import { circle } from '@turf/circle';
import { pointOnFeature } from '@turf/point-on-feature';
import { isPoint, isGeoJSONObject } from 'geojson-validation';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import MarkerShadowIcon from 'leaflet/dist/images/marker-shadow.png';
import center from '@turf/center';
import flip from '@turf/flip';
import { bbox } from '@turf/bbox';
import { GeomanControls } from 'react-leaflet-geoman-v2';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import { renderToString } from 'react-dom/server';

// src/components/GeoJSON.tsx
var GeoJSON = createPathComponent(
  function createGeoJSON({ data, ...options }, ctx) {
    const geoJSON = new GeoJSON$1(data, options);
    return createElementObject(
      geoJSON,
      extendContext(ctx, { overlayContainer: geoJSON })
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
var tpl = (str, data) => str ? template(str, { interpolate: /{{([\s\S]+?)}}/g })(data) : "";
function PopupTemplate(props) {
  const { template: template2, heading, content, data } = props;
  if (template2) return /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: tpl(template2, data) } });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "pc-heading", children: tpl(heading, data) }),
    /* @__PURE__ */ jsx("hr", {}),
    isArray(content) ? /* @__PURE__ */ jsx("div", { children: content?.map((c, k) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("span", { className: "pc-content-label", children: [
        c.label,
        ": "
      ] }),
      get(data, c.value)
    ] }, k)) }) : /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: tpl(content, data) } })
  ] });
}
var PopupTemplate_default = PopupTemplate;
function GeoJSONAjax(props) {
  const { dataUrl, children, ...opts } = props;
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (enabled && dataUrl) {
      fetch(dataUrl).then((resp) => resp.json()).then((resp) => {
        setData(resp);
      });
    }
  }, [enabled, dataUrl]);
  return /* @__PURE__ */ jsx(GeoJSON, { ...opts, data, eventHandlers: {
    "add": (event) => {
      setEnabled(true);
    },
    "remove": (event) => {
      setEnabled(false);
    }
  }, children: isFunction(children) && data && children(data) });
}
var GeoJSONAjax_default = GeoJSONAjax;
var featuresAdapter = createEntityAdapter();
var featuresSelectors = featuresAdapter.getSelectors((state) => state);
var initialState = featuresAdapter.getInitialState({
  $wire: null,
  $watch: null,
  state: null,
  config: {}
});
var actions = (set, get3) => ({
  addFeature: (feature2) => set((state) => {
    featuresAdapter.addOne(state, { id: nanoid(), ...feature2 });
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
var MapStoreContext = createContext(null);
var MapStoreProvider = ({ children, value }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createStore()(immer((set, get3) => ({
      ...initialState,
      ...value,
      ...actions(set),
      reset: () => ({
        ...initialState,
        ...value
      })
    })));
  }
  return /* @__PURE__ */ jsx(MapStoreContext.Provider, { value: storeRef.current, children });
};
var useMapStore = (selector) => {
  const store = useContext(MapStoreContext);
  if (!store) {
    throw new Error("Missing MapStoreProvider");
  }
  return useStore(store, selector);
};
function setFeaturesByState({ state, setFeatures }) {
  const type = getType(state);
  if (type === "MultiPoint") {
    setFeatures(
      getCoords(state).map((coord) => ({
        id: nanoid(),
        ...point(coord)
      }))
    );
  } else if (type === "MultiLineString") {
    setFeatures(
      getCoords(state).map((coord) => ({
        id: nanoid(),
        ...lineString(coord)
      }))
    );
  } else if (type === "MultiPolygon") {
    setFeatures(
      getCoords(state).map((coord) => ({
        id: nanoid(),
        ...polygon(coord)
      }))
    );
  } else if (["Point", "LineString", "Polygon"].includes(type)) {
    setFeatures([
      {
        id: nanoid(),
        ...feature(state)
      }
    ]);
  } else if (type === "GeometryCollection") {
    let newFeatures = [];
    flattenEach(state, (currentFeature) => newFeatures.push({ id: nanoid(), ...currentFeature }));
    setFeatures(newFeatures);
  }
}
var setFeaturesByState_default = setFeaturesByState;
function setDefaultIcon(options = {}) {
  L.Icon.Default.mergeOptions({
    iconUrl: MarkerIcon,
    iconRetinaUrl: MarkerIcon2x,
    shadowUrl: MarkerShadowIcon,
    ...options
  });
}
var setDefaultIcon_default = setDefaultIcon;
function toLatLng(data) {
  if (!data) return data;
  return getCoord(flip(center(data)));
}
var toLatLng_default = toLatLng;
function toBounds(data) {
  const arr = bbox(data);
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
  const geometry = getGeom(state);
  if (isPoint(geometry)) {
    if (zoomToFeature) {
      const bounds = toBounds_default(circle(state, 0.25, { steps: 4 }));
      map.fitBounds(bounds, { animate: false });
    } else {
      map.panTo(toLatLng_default(state), { animate: false });
    }
    return;
  }
  if (isGeoJSONObject(geometry)) {
    if (zoomToFeature) {
      const bounds = toBounds_default(state);
      map.fitBounds(bounds, { animate: false });
    } else {
      map.panTo(toLatLng_default(pointOnFeature(state)));
    }
  }
}
var zoomToFeatureByState_default = zoomToFeatureByState;
function FeatureManager() {
  const map$1 = useMap();
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
  useEffect(() => {
    if (!state) return;
    setFeaturesByState_default({
      state,
      setFeatures
    });
    zoomToFeatureByState_default({
      state,
      config: { zoomToFeature },
      map: map$1
    });
  }, []);
  useUpdateEffect(() => {
    if (features?.length) {
      if (["Point", "LineString", "Polygon"].includes(geomType) && features?.length === 1) {
        const geometry = getGeom(last(features));
        if (geomType === "Point") {
          const coords = getCoord(geometry);
          latitudeField && $wire.set(latitudeField, coords[1], false);
          longitudeField && $wire.set(longitudeField, coords[0], false);
        }
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      } else if (geomType === "MultiPoint") {
        const geometry = getGeom(multiPoint(map(features, (i) => getCoord(i))));
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      } else if (geomType === "MultiLineString") {
        const geometry = getGeom(
          multiLineString(map(features, (i) => getCoords(i)))
        );
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      } else if (geomType === "MultiPolygon") {
        const geometry = getGeom(
          multiPolygon(map(features, (i) => getCoords(i)))
        );
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      } else if (geomType === "GeometryCollection") {
        const geometry = getGeom(
          geometryCollection(map(features, (i) => getGeom(i)))
        );
        drawField && $wire.set(drawField, JSON.stringify(geometry), false);
      }
    } else {
      drawField && $wire.set(drawField, "", false);
    }
  }, [JSON.stringify(features)]);
  return features?.map((f, k) => /* @__PURE__ */ jsx(
    GeoJSON,
    {
      data: f,
      eventHandlers: {
        "pm:update": ({ layer, target }) => {
          featureEach(target.toGeoJSON(), (feature2, index) => {
            updateFeature({
              id: feature2.id,
              changes: feature2
            });
          });
        },
        "pm:cut": (e) => {
          map$1.removeLayer(e.layer);
          const id = get(e, "originalLayer.feature.id");
          removeFeature(id);
          const type = getType(e.layer.toGeoJSON());
          const geometry = getGeom(
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
var FullscreenControl = createControlComponent(function createFullscreenControl(props) {
  return new Control.FullScreen(props);
});
function DynamicLayer(props) {
  const { type, popupTemplate, ...other } = props;
  let tplPopupProps = popupTemplate ? isString(popupTemplate) ? { template: popupTemplate } : popupTemplate : {};
  if (type === "wms") {
    const opts = {
      url: "",
      format: "image/png",
      transparent: true,
      ...other
    };
    return /* @__PURE__ */ jsx(WMSTileLayer, { ...opts });
  }
  if (type === "geojson") {
    if (other.data) {
      const opts = {
        data: isString(other.data) ? JSON.parse(other.data) : other.data,
        pmIgnore: true,
        onEachFeature: (feature2, layer) => {
          popupTemplate && layer.bindPopup(() => {
            return renderToString(
              /* @__PURE__ */ jsx(PopupTemplate_default, { data: feature2?.properties, ...tplPopupProps })
            );
          });
        }
      };
      return /* @__PURE__ */ jsx(GeoJSON, { ...opts });
    }
    if (other.dataUrl) {
      const opts = {
        dataUrl: other.dataUrl,
        pmIgnore: true,
        onEachFeature: (feature2, layer) => {
          popupTemplate && layer.bindPopup(() => {
            return renderToString(
              /* @__PURE__ */ jsx(PopupTemplate_default, { data: feature2?.properties, ...tplPopupProps })
            );
          });
        }
      };
      return /* @__PURE__ */ jsx(GeoJSONAjax_default, { ...opts });
    }
  }
  return null;
}
var DynamicLayer_default = DynamicLayer;
var controlComponents = {
  zoomControl: ZoomControl,
  layersControl: LayersControl,
  drawControl: GeomanControls,
  attributionControl: AttributionControl,
  scaleControl: ScaleControl,
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
  const controls = useMemo(() => map(_controls, (opts, name) => {
    const Component = controlComponents[name];
    if (!opts || opts?.enabled == false || !Component) return null;
    let options = { ...opts };
    let children = null;
    if (name === "layersControl") {
      children = /* @__PURE__ */ jsxs(Fragment, { children: [
        baseLayers?.map(
          ({ selected = false, title = "None", ...layerProps }, k) => /* @__PURE__ */ jsx(LayersControl.BaseLayer, { name: title, checked: selected, children: /* @__PURE__ */ jsx(TileLayer, { url: "", ...layerProps }) }, k)
        ),
        layers?.map(
          ({ selected = false, title = "None", ...layerProps }, k) => /* @__PURE__ */ jsx(LayersControl.Overlay, { name: title, checked: selected, children: /* @__PURE__ */ jsx(DynamicLayer_default, { ...layerProps }) }, k)
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
    return /* @__PURE__ */ jsx(Component, { ...options, children }, name);
  }).filter((v) => v), [JSON.stringify(_controls)]);
  return controls.map((control) => control);
}
var ControlManager_default = ControlManager;

export { ControlManager_default as ControlManager, FeatureManager_default as FeatureManager, FullscreenControl, GeoJSON, GeoJSONAjax_default as GeoJSONAjax, MapStoreProvider, PopupTemplate_default as PopupTemplate, featuresSelectors, setDefaultIcon_default as setDefaultIcon, setFeaturesByState_default as setFeaturesByState, toBounds_default as toBounds, toLatLng_default as toLatLng, useMapStore, zoomToFeatureByState_default as zoomToFeatureByState };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map