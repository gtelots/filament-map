import { useRef } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { ControlManager, FeatureManager, setDefaultIcon, useMapStore } from "react-map"

import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'

setDefaultIcon()

export type AppProps = {
  $wire: any
  $watch: any
  state: any
  config: Record<string, any>
}

function App(props: AppProps){
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

  return (
    <MapContainer {...mapOptions} ref={mapRef}>
      <ControlManager />
      <FeatureManager />
    </MapContainer>
  )
}

export default App
