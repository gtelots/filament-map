import * as react from 'react';
import * as geojson from 'geojson';
import { GeoJsonObject } from 'geojson';
import { PathProps } from '@react-leaflet/core';
import { GeoJSON as GeoJSON$1, GeoJSONOptions, ControlPosition } from 'leaflet';
import { LayerGroupProps } from 'react-leaflet';

interface GeoJSONProps extends GeoJSONOptions, LayerGroupProps, PathProps {
    data: GeoJsonObject;
}
declare const GeoJSON: react.ForwardRefExoticComponent<GeoJSONProps & react.RefAttributes<GeoJSON$1<any, geojson.Geometry>>>;

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

export { FullscreenControl, GeoJSON, setDefaultIcon, toBounds, toLatLng };
