
import { circle } from '@turf/circle'
import { getGeom } from '@turf/invariant'
import { pointOnFeature } from '@turf/point-on-feature'
import { isGeoJSONObject, isPoint } from 'geojson-validation'
import { toBounds, toLatLng } from '../utils'

function zoomToFeatureByState({
  state,
  config: { zoomToFeature },
  map
}){
  const geometry = getGeom(state as any)

  if (isPoint(geometry)) {
    if (zoomToFeature) {
      const bounds = toBounds(circle(state, 0.25, { steps: 4 })) as any
      map.fitBounds(bounds, { animate: false })
    } else {
      map.panTo(toLatLng(state), { animate: false })
    }

    return
  }

  if (isGeoJSONObject(geometry)) {
    if (zoomToFeature) {
      const bounds = toBounds(state) as any
      map.fitBounds(bounds, { animate: false })
    } else {
      map.panTo(toLatLng(pointOnFeature(state)))
    }
  }
}

export default zoomToFeatureByState
