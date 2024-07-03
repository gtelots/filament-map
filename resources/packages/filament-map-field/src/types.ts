import { CircleOptions, MapOptions, MarkerOptions, PathOptions, PolylineOptions } from 'leaflet'

export type TBaseLayer = {
  title?: string
  url: string
  selected?: boolean
  attribution?: string
}

export type TConfig = {
  statePath: string
  defaultCenter: any
  defaultZoom: number
  zoomToState: boolean
  latitudeField: string
  longitudeField: string
  geoJsonField: string
  geoJsonProperty: Record<string, any>
  mapOptions: MapOptions
  markerOptions: MarkerOptions
  circleOptions: CircleOptions
  polylineOptions: PolylineOptions
  polygonOptions: PathOptions
  rectangleOptions: PathOptions
  baseLayers: Array<TBaseLayer>
  layers: Array<Record<string, any>>
}
