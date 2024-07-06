import { useEffect } from 'react';
import useMapStore, { featuresSelectors } from './useMapStore'
import { GeoJSON, toBounds, toLatLng } from 'react-map';
import { isGeoJSONObject, isPoint } from 'geojson-validation'
import { getCoord, getGeom } from '@turf/invariant'
import { useMap } from 'react-leaflet';
import { pointOnFeature } from '@turf/point-on-feature'
import { bbox } from '@turf/bbox'
import { circle } from "@turf/circle";
import FeatureState from './FeatureState';
import { useUpdateEffect } from 'react-use';

function FeaturesManager() {
  const map = useMap()
  const [
    state,
    $wire,
    geomType,
    latitudeField,
    longitudeField,
    drawField,
    zoomToFeature,
    features,
    setFeatures
  ] = useMapStore((state: any) => [
    state.state,
    state.$wire,
    state.config.geomType,
    state.config.latitudeField,
    state.config.longitudeField,
    state.config.drawField,
    state.config.zoomToFeature,
    featuresSelectors.selectAll(state),
    state.setFeatures,
  ])

  useEffect(() => {
    if(!state) return

    setFeatures(state)

    const geometry = getGeom(state as any)

    if(isPoint(geometry)) {
      if(zoomToFeature) {
        const bounds = toBounds(circle(state, 0.25, { steps: 4 })) as any
        map.fitBounds(bounds, { animate: false })
      } else {
        map.panTo(toLatLng(state), { animate: false })
      }

      return;
    }

    if(isGeoJSONObject(geometry)){
      if(zoomToFeature) {
        const bounds = toBounds(state) as any
        map.fitBounds(bounds, { animate: false })
      } else {
        map.panTo(toLatLng(pointOnFeature(state)))
      }
    }
  }, [])

  useUpdateEffect(() => {
    if(features?.length) {
      if(geomType === 'Point'){
        const coords = getCoord(features[0])

        latitudeField && $wire.set(latitudeField, coords[1], false)
        longitudeField && $wire.set(longitudeField, coords[0], false)
        drawField && $wire.set(drawField, JSON.stringify(features[0]), false)
      }
    }

  }, [JSON.stringify(features)])



  return features?.map((f, k) => (
    <GeoJSON
      key={k}
      data={f}
      eventHandlers={{
        'pm:update': ({ layer }) => {
          const geometry = getGeom(layer.toGeoJSON())

          setFeatures(geometry)
        }
      } as any}
    />
  ))
}

export default FeaturesManager

