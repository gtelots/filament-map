import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import Alpine from 'alpinejs'
import { cloneDeep } from 'lodash'
import { useEffect, useRef } from 'react'
import {
  MapContainer
} from 'react-leaflet'
import { ControlManager, FeatureManager, setDefaultIcon, setFeaturesByState, useMapStore, zoomToFeatureByState } from 'react-map'

import { TConfig } from './types'

export type AppProps = {
  $wire: any
  $watch: any
  state: any
  config: TConfig
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


  const [setFeatures, removeFeatures] = useMapStore(
    (state) => [
      state.setFeatures,
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

  return (
    <MapContainer {...mapOptions} ref={mapRef}>
      <ControlManager />
      <FeatureManager />
    </MapContainer>
  )
}

export default App
