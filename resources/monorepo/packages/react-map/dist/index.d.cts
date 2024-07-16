import * as react from 'react';
import * as geojson from 'geojson';
import { GeoJsonObject } from 'geojson';
import { PathProps } from '@react-leaflet/core';
import { GeoJSON as GeoJSON$1, GeoJSONOptions, ControlPosition } from 'leaflet';
import { LayerGroupProps } from 'react-leaflet';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as _reduxjs_toolkit from '@reduxjs/toolkit';

interface GeoJSONProps extends GeoJSONOptions, LayerGroupProps, PathProps {
    data: GeoJsonObject;
}
declare const GeoJSON: react.ForwardRefExoticComponent<GeoJSONProps & react.RefAttributes<GeoJSON$1<any, geojson.Geometry>>>;

declare function FeatureManager(): any;

declare function ControlManager(): any;

declare const featuresSelectors: _reduxjs_toolkit.EntitySelectors<{
    id: _reduxjs_toolkit.EntityId;
}, any, _reduxjs_toolkit.EntityId>;
declare const MapStoreProvider: ({ children, value }: {
    children: any;
    value: any;
}) => react_jsx_runtime.JSX.Element;
declare const useMapStore: (selector: any) => any;

type FullscreenOptions = {
    content?: string | undefined;
    position?: ControlPosition | undefined;
    title?: string | undefined;
    titleCancel?: string | undefined;
    forceSeparateButton?: boolean | undefined;
    forcePseudoFullscreen?: boolean | undefined;
    fullscreenElement?: false | HTMLElement | undefined;
};
declare const FullscreenControl: react.ForwardRefExoticComponent<FullscreenOptions & react.RefAttributes<Control.FullScreen>>;

declare function setDefaultIcon(options?: {}): void;

declare function toLatLng(data: any): any;

declare function toBounds(data: any): number[][];

declare function setFeaturesByState({ state, setFeatures }: {
    state: any;
    setFeatures: any;
}): void;

declare function zoomToFeatureByState({ state, config: { zoomToFeature }, map }: {
    state: any;
    config: {
        zoomToFeature: any;
    };
    map: any;
}): void;

export { ControlManager, FeatureManager, FullscreenControl, GeoJSON, MapStoreProvider, featuresSelectors, setDefaultIcon, setFeaturesByState, toBounds, toLatLng, useMapStore, zoomToFeatureByState };
