import { TConfig } from '../types.ts'
import { AllGeoJSON } from '@turf/helpers'
import { isGeoJSONObject, isPoint } from 'geojson-validation'
import { useMap } from 'react-leaflet'
import { GeoJSON } from './GeoJSON.tsx'
import toLatLng from '../utils/toLatLng.ts'
import { useEffect } from 'react'
import bboxToBounds from '../utils/bboxToBounds.ts'
import { bbox } from '@turf/bbox'
import { LatLngBoundsExpression } from 'leaflet'
import { pointOnFeature } from '@turf/point-on-feature'
import { getGeom } from '@turf/invariant'

type FeatureStateProps = {
  $wire: any
  state: AllGeoJSON
  data: AllGeoJSON
  config: TConfig
}

function FeatureState(props: FeatureStateProps){
  const map = useMap()
  const { data, $wire, state, config } = props
  const { latitudeField, longitudeField, geoJsonField, zoomToState } = config

  useEffect(() => {
    if(!state) return;

    const geometry = getGeom(state as any)

    if(isPoint(geometry)) {
      map.panTo(toLatLng(state), { animate: false })
      return;
    }

    if(isGeoJSONObject(geometry)){
      if(zoomToState) {
        const bounds = bboxToBounds(bbox(state)) as LatLngBoundsExpression
        map.fitBounds(bounds, { animate: false })
      } else {
        map.panTo(toLatLng(pointOnFeature(state)))
      }
    }
  }, [])

  if(!data) return null;

  const options = {
    data,
    eventHandlers: {
      'pm:update': ({ layer }) => {
        const geometry = getGeom(layer.toGeoJSON())

        if(isPoint(geometry)){
          const latlng = toLatLng(geometry)
          latitudeField && $wire.set(latitudeField, latlng[0])
          longitudeField && $wire.set(longitudeField, latlng[1])
        } else {
          geoJsonField && $wire.set(geoJsonField, JSON.stringify(geometry))
        }
      }
    }
  } as any

  return <GeoJSON {...options} />;
}

export default FeatureState
