import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import Alpine from 'alpinejs'
import { cloneDeep, get } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import {
  MapContainer,
  Marker,
  Pane
} from 'react-leaflet'
import { ControlManager, FeatureManager, setDefaultIcon, setFeaturesByState, useMapStore, zoomToFeatureByState } from 'react-map'
import L from 'leaflet'

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

  const [geocompleteLocation, setGeocompleteLocation] = useState<any>()

  const mapRef = useRef<any>(null)

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

    window.addEventListener('filament-map::geocompleteSelected', (event) => {
      const location = get(event, 'detail.geometry.location')
      const viewport = get(event, 'detail.geometry.viewport') as any

      let markerOpts = { ...config.markerOptions }
      if (markerOpts.icon) markerOpts.icon = L.icon(markerOpts.icon)

      if(!['Point', 'MultiPoint'].includes(config.geomType)){
        setGeocompleteLocation(location)
      }

      mapRef.current.fitBounds([
        [viewport.southwest.lat, viewport.southwest.lng],
        [viewport.northeast.lat, viewport.northeast.lng],
      ])

    })
  }, [])

  return (
    <MapContainer {...mapOptions} ref={mapRef}>
      <ControlManager />
      <FeatureManager />

      {geocompleteLocation && <Marker position={geocompleteLocation} />}
    </MapContainer>
  )
}

export default App
