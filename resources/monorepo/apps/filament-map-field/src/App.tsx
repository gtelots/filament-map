import {
  AttributionControl,
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import Alpine from 'alpinejs'
import { Component, Fragment, useEffect, useRef } from 'react'
import { map as _map } from 'lodash'
import { GeomanControls } from 'react-leaflet-geoman-v2'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import { setDefaultIcon } from 'react-map'

import { TConfig } from './types'

export type AppProps = {
  $wire: any
  $watch: any
  state: any
  config: TConfig
}

const controlComponents = {
  zoomControl: ZoomControl,
  layersControl: LayersControl,
  drawControl: GeomanControls,
  attributionControl: AttributionControl,
  scaleControl: ScaleControl,
}

const defaultDrawControlOptions = {
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
  rotateMode: false,
}

setDefaultIcon()

function App(props: AppProps) {
  const { $wire, $watch, state, config } = props
  const {
    statePath,
    defaultCenter,
    defaultZoom,
    latitudeField,
    longitudeField,
    drawingField,
    baseLayers,
    geomType,
    ...other
  } = config

  const mapRef = useRef(null)
  const rawState = Alpine.raw(state)

  const mapOptions = {
    style: {
      height: '100%',
    },
    zoomControl: false,
    attributionControl: false,
    ...other.mapOptions,
    center: defaultCenter,
    zoom: defaultZoom,
    whenReady: ({ target: map }) => {
      setTimeout(() => map.invalidateSize(), 100)
    },
  } as any

  useEffect(() => {
    $watch('state', (value) => {})
  }, [])

  const controls = _map(other.controls, (value, key) => {
    const Component = controlComponents[key]
    let options = { ...value }
    if (!Component || !options) return null
    let children: any = null

    if (key === 'layersControl') {
      children = (
        <Fragment>
          {baseLayers?.map(
            ({ selected = false, title = 'None', ...layerProps }, k) => (
              <LayersControl.BaseLayer key={k} name={title} checked={selected}>
                <TileLayer {...layerProps} />
              </LayersControl.BaseLayer>
            ),
          )}
        </Fragment>
      )
    }

    if (key === 'drawControl') {
      options = {
        ...options,
        options: {
          drawMarker: false,
          drawCircle: false,
          drawCircleMarker: false,
          drawPolyline: false,
          drawRectangle: false,
          drawPolygon: false,
          drawText: false,

          editMode: false,
          dragMode: false,
          cutPolygon: false,
          removalMode: false,
          rotateMode: false,
        },
      }

      if (['Point', 'MultiPoint'].includes(geomType)) {
        options.options = {
          ...options.options,
          drawMarker: true,
          editMode: true,
          removalMode: true,
        }
      }

      if (['LineString', 'MultiLineString'].includes(geomType)) {
        options.options = {
          ...options.options,
          drawPolyline: true,
          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true,
        }
      }

      if (['Polygon', 'MultiPolygon'].includes(geomType)) {
        options.options = {
          ...options.options,
          drawRectangle: true,
          drawPolygon: true,
          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true,
        }
      }
    }

    return <Component key={key} {...options} children={children} />
  }).filter((v) => v)

  return (
    <MapContainer {...mapOptions}>
      {controls.map((control: any) => control)}
    </MapContainer>
  )
}

export default App
