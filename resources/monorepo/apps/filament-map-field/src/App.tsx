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
import { FullscreenControl, setDefaultIcon } from 'react-map'

import FeaturesManager from './FeaturesManager'
import { TConfig } from './types'
import useMapStore from './useMapStore'
import setFeaturesByState from './utils/setFeaturesByState'
import zoomToFeatureByState from './utils/zoomToFeatureByState'

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
    zoomToFeature,
    ...other
  } = config

  const [addFeature, setFeatures, removeFeature, removeFeatures] = useMapStore(
    (state) => [
      state.addFeature,
      state.setFeatures,
      state.removeFeature,
      state.removeFeatures,
    ],
  )

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
      setTimeout(() => {
        map.invalidateSize()
      }, 100)
    },
  } as any

  useEffect(() => {
    $watch('state', (value) => {
      console.log('watchState', value)

      if (!value) {
        removeFeatures()
        return
      }

      const map = mapRef.current as any
      const state = cloneDeep(Alpine.raw(value))

      setFeaturesByState({
        state,
        setFeatures,
      })

      zoomToFeatureByState({
        state,
        config: { zoomToFeature },
        map,
      })
    })
  }, [])

  const handleCreate = (e) => {
    e.target.removeLayer(e.layer)

    if (['Point', 'LineString', 'Polygon'].includes(geomType)) removeFeatures()

    addFeature(e.layer.toGeoJSON())
  }

  const handleRemove = ({ layer, target }) => {
    const id = layer.feature.id

    id && removeFeature(id)
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
      } else if (['LineString', 'MultiLineString'].includes(geomType)) {
        options.options = {
          ...options.options,
          drawPolyline: true,
          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true,
        }
      } else if (['Polygon', 'MultiPolygon'].includes(geomType)) {
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
          rotateMode: true,
        }
      }

      options.onCreate = handleCreate
      options.onMapRemove = handleRemove
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
