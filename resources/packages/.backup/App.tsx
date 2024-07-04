import {FeatureGroup, LayersControl, MapContainer, TileLayer, ZoomControl} from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import Alpine from 'alpinejs'
import MapEvents from './components/MapEvents.tsx'
import { FullscreenControl } from './components/FullscreenControl.tsx'
import { TConfig } from './types.ts'
import { isPoint } from 'geojson-validation'
import { GeomanControls } from 'react-leaflet-geoman-v2'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import FeatureState from './components/FeatureState.tsx'
import { getGeom } from '@turf/invariant'
import toLatLng from './utils/toLatLng.ts'
import { feature as createFeature } from "@turf/helpers";
import bboxToBounds from './utils/bboxToBounds.ts'
import { bbox } from '@turf/bbox'
import { Map } from 'leaflet'

export type AppProps = {
  $wire: any
  $watch: any
  state: any
  config: TConfig
}

const markerDrawOptions = {
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
}

const polyDrawOptions = {
  drawMarker: false,
  drawCircle: false,
  drawCircleMarker: false,
  drawPolyline: true,
  drawRectangle: false,
  drawPolygon: false,
  drawText: false,

  editMode: true,
  dragMode: true,
  cutPolygon: true,
  removalMode: true,
  rotateMode: true
}

function App(props: AppProps) {
  const mapRef = useRef(null)

  const { $wire, $watch, state, config } = props
  const {
    statePath,
    latitudeField,
    longitudeField,
    geoJsonField,
    baseLayers,
    geomType,
    ...restConfig
  } = config

  const rawState = Alpine.raw(state)

  const mapOptions = {
    center: restConfig.defaultCenter,
    zoom: restConfig.defaultZoom,
    style: {
      height: '100%'
    },
    zoomControl: false,
    attributionControl: false,
    ...restConfig.mapOptions,
    whenReady: ({ target: map }) => {
      setTimeout(() => map.invalidateSize(), 100)
    }
  } as any

  useEffect(() => {
    $watch('state', (value) => {
      console.log(value)

      const map = mapRef.current as any
      const geometry = Alpine.raw(value)
      const newFeature = createFeature(geometry)

      setFeature(newFeature)

      if(isPoint(geometry)){
        map.panTo(toLatLng(geometry))
      } else {
        const bounds = bboxToBounds(bbox(newFeature as any)) as any
        map.fitBounds(bounds)
      }
    })
  }, [])

  const handleCreate = (e) => {
    e.target.removeLayer(e.layer)
    setFeature(e.layer.toGeoJSON())

    const geometry = getGeom(e.layer.toGeoJSON())

    if(isPoint(geometry)){
      const latlng = toLatLng(geometry)
      latitudeField && $wire.set(latitudeField, latlng[0])
      longitudeField && $wire.set(longitudeField, latlng[1])
    } else {
      geoJsonField && $wire.set(geoJsonField, geometry)
    }
  }

  const handleUpdate = (e) => {
    console.log(e)
  }

  const [feature, setFeature] = useState<any>(rawState)

  let drawControlOptions = {
    position: 'topleft',
  } as any

  if(['Point', 'MultiPoint'].includes(geomType)) {
    drawControlOptions = {
      ...drawControlOptions,
      ...markerDrawOptions
    }
  } else if(['Polyline', 'MultiPolyline', 'Polygon', 'MultiPolygon'].includes(geomType)) {
    drawControlOptions = {
      ...drawControlOptions,
      ...polyDrawOptions
    }
  }

  return (
    <MapContainer {...mapOptions} ref={mapRef}>
      <MapEvents />

      <LayersControl position="topright">
        {baseLayers?.map(({selected = false, title = 'None', ...layerProps}, k) => (
          <LayersControl.BaseLayer key={k} name={title} checked={selected}>
            <TileLayer {...layerProps} />
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>

      <ZoomControl position="bottomright"/>
      <FullscreenControl position="bottomright"/>

      {feature ? (
        <FeatureState
          $wire={$wire}
          state={rawState}
          data={feature}
          config={config}
        />
      ): null}

      <FeatureGroup>
        <GeomanControls
          options={drawControlOptions}
          globalOptions={{
            continueDrawing: false,
          }}
          onCreate={handleCreate}
        />
      </FeatureGroup>
    </MapContainer>
  )
}

export default App
