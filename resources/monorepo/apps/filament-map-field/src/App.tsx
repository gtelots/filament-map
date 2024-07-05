import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import Alpine from 'alpinejs'
import { map as _map, cloneDeep } from 'lodash'
import { Fragment, useEffect, useRef } from 'react'
import {
  AttributionControl,
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import { GeomanControls } from 'react-leaflet-geoman-v2'
import { FullscreenControl, setDefaultIcon, toBounds, toLatLng } from 'react-map'
import { feature as createFeature } from '@turf/helpers'
import { isPoint } from 'geojson-validation'
import { getGeom } from '@turf/invariant'

import FeaturesManager from './FeaturesManager'
import { TConfig } from './types'
import useMapStore from './useMapStore'

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
  fullscreenControl: FullscreenControl,
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
    drawField,
    baseLayers,
    geomType,
    ...other
  } = config

  const [setFeatures] = useMapStore(state => [state.setFeatures])

  const mapRef = useRef(null)

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
    $watch('state', (value) => {
      console.log('watchState', value);

      const map = mapRef.current as any
      const geometry = cloneDeep(Alpine.raw(value))
      const newFeature = createFeature(geometry)

      setFeatures(newFeature)

      if (isPoint(geometry)) {
        map.panTo(toLatLng(geometry))
      } else {
        const bounds = toBounds(newFeature as any) as any
        map.fitBounds(bounds)
      }
    })
  }, [])

  const handleCreate = (e) => {
    e.target.removeLayer(e.layer)
    setFeatures(e.layer.toGeoJSON())

    const geometry = getGeom(e.layer.toGeoJSON())

    if(isPoint(geometry)){
      const latlng = toLatLng(geometry)
      latitudeField && $wire.set(latitudeField, latlng[0], false)
      longitudeField && $wire.set(longitudeField, latlng[1], false)
    } else {
      drawField && $wire.set(drawField, geometry, false)
    }
  }

  const controls = _map(other.controls, ({ name, enabled, ...value }) => {
    const Component = controlComponents[name]
    if (!name || enabled == false || !Component) return null

    let options = { ...value }
    let children: any = null

    if (name === 'layersControl') {
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

    if (name === 'drawControl') {
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

      options.onCreate = handleCreate
    }

    return <Component key={name} {...options} children={children} />
  }).filter((v) => v)

  return (
    <MapContainer {...mapOptions} ref={mapRef}>
      {controls.map((control: any) => control)}

      <FeaturesManager />
    </MapContainer>
  )
}

export default App
