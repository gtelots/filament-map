import { geometryCollection, multiLineString, multiPoint, multiPolygon } from "@turf/helpers"
import { getCoord, getCoords, getGeom } from '@turf/invariant'
import { featureEach } from "@turf/meta"
import { map as _map, last } from 'lodash'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { GeoJSON } from 'react-map'
import { useUpdateEffect } from 'react-use'
import useMapStore, { featuresSelectors } from './useMapStore'
import setFeaturesByState from './utils/setFeaturesByState'
import zoomToFeatureByState from './utils/zoomToFeatureByState'

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
    setFeatures,
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
    if (!state) return

    setFeaturesByState({
      state,
      setFeatures
    })

    zoomToFeatureByState({
      state,
      config: {zoomToFeature},
      map
    })
    
  }, [])

  useUpdateEffect(() => {
    if (features?.length) {
      if(['Point', 'LineString', 'Polygon'].includes(geomType)){
        const geometry = getGeom(last(features) as any)

        if(geomType === 'Point'){
          const coords = getCoord(geometry)
          latitudeField && $wire.set(latitudeField, coords[1], false)
          longitudeField && $wire.set(longitudeField, coords[0], false)
        }

        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      } else if(geomType === 'MultiPoint'){
        const geometry = getGeom(multiPoint(_map(features, i => getCoord(i))))
        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      } else if(geomType === 'MultiLineString'){
        const geometry = getGeom(multiLineString(_map(features, i => getCoords(i))))
        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      } else if(geomType === 'MultiPolygon'){
        const geometry = getGeom(multiPolygon(_map(features, i => getCoords(i))))
        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      } else if(geomType === 'GeometryCollection'){
        const geometry = getGeom(geometryCollection(_map(features, i => getGeom(i))))
        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      }
    } else {
      drawField && $wire.set(drawField, '', false)
    }
  }, [JSON.stringify(features)])

  return features?.map((f, k) => (
    <GeoJSON
      key={k}
      data={f}
      eventHandlers={
        {
          'pm:update': ({ layer, target }) => {
            featureEach(target.toGeoJSON(), (feature, index) => {
              const geometry = getGeom(feature)
              setFeatures(geometry)
            })
          },
          'layer:remove': (...args) => {
            console.log(args);
          },
        } as any
      }
    />
  ))
}

export default FeaturesManager
