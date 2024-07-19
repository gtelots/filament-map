import {
  geometryCollection,
  multiLineString,
  multiPoint,
  multiPolygon,
} from '@turf/helpers'
import { getCoord, getCoords, getGeom, getType } from '@turf/invariant'
import { featureEach } from '@turf/meta'
import { map as _map, get, last } from 'lodash'
import { useEffect } from 'react'
import { Pane, useMap } from 'react-leaflet'
import { featuresSelectors, useMapStore } from '../hooks/useMapStore'
import { useUpdateEffect } from 'react-use'
import setFeaturesByState from '../utils/setFeaturesByState'
import zoomToFeatureByState from '../utils/zoomToFeatureByState'
import { GeoJSON } from '../components/GeoJSON'
import L from 'leaflet'

console.log(123);

function FeatureManager() {
  const map = useMap()
  const [
    state,
    $wire,
    geomType,
    latitudeField,
    longitudeField,
    drawField,
    zoomToFeature,
    markerOptions,
    polylineOptions,
    polygonOptions,
    rectangleOptions,
    features,
    updateFeature,
    setFeatures,
    removeFeature,
  ] = useMapStore((state: any) => [
    state.state,
    state.$wire,
    state.config.geomType,
    state.config.latitudeField,
    state.config.longitudeField,
    state.config.drawField,
    state.config.zoomToFeature,
    state.config.markerOptions,
    state.config.polylineOptions,
    state.config.polygonOptions,
    state.config.rectangleOptions,
    featuresSelectors.selectAll(state),
    state.updateFeature,
    state.setFeatures,
    state.removeFeature,
  ])

  useEffect(() => {
    if (!state) return

    setFeaturesByState({
      state,
      setFeatures,
    })

    zoomToFeatureByState({
      state,
      config: { zoomToFeature },
      map,
    })
  }, [])

  useUpdateEffect(() => {
    if (features?.length) {
      console.log(features);

      if (
        ['Point', 'LineString', 'Polygon'].includes(geomType) &&
        features?.length === 1
      ) {
        const geometry = getGeom(last(features) as any)

        if (geomType === 'Point') {
          const coords = getCoord(geometry)
          latitudeField && $wire.set(latitudeField, coords[1], false)
          longitudeField && $wire.set(longitudeField, coords[0], false)
        }

        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      } else if (geomType === 'MultiPoint') {
        const geometry = getGeom(multiPoint(_map(features, (i) => getCoord(i))))
        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      } else if (geomType === 'MultiLineString') {
        const geometry = getGeom(
          multiLineString(_map(features, (i) => getCoords(i))),
        )
        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      } else if (geomType === 'MultiPolygon') {
        const geometry = getGeom(
          multiPolygon(_map(features, (i) => getCoords(i))),
        )
        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      } else if (geomType === 'GeometryCollection') {
        const geometry = getGeom(
          geometryCollection(_map(features, (i) => getGeom(i))),
        )
        drawField && $wire.set(drawField, JSON.stringify(geometry), false)
      }
    } else {
      drawField && $wire.set(drawField, '', false)
    }
  }, [JSON.stringify(features)])

  let geojsonOpts = {
    pointToLayer: (point, latlng) => {
      let markerOpts = { ...markerOptions }
      if (markerOpts.icon) markerOpts.icon = L.icon(markerOpts.icon)
      return L.marker(latlng, markerOpts)
    },
    style: () => {
      return {
        ...polylineOptions,
        ...polygonOptions,
        ...rectangleOptions,
      }
    },
    eventHandlers: {
      'pm:update': ({ layer, target }) => {
        featureEach(target.toGeoJSON(), (feature, index) => {
          updateFeature({
            id: feature.id,
            changes: feature,
          })
        })
      },

      'pm:cut': (e) => {
        map.removeLayer(e.layer)

        const id = get(e, 'originalLayer.feature.id')
        removeFeature(id)

        const type = getType(e.layer.toGeoJSON())
        const geometry = getGeom(
          type === geomType
            ? e.layer.toGeoJSON()
            : e.originalLayer.toGeoJSON(),
        )

        setFeaturesByState({
          state: geometry,
          setFeatures,
        })
      },
    } as any,
    pane: ['Point', 'MultiPoint'].includes(geomType) ? 'stateMarkerPane' : 'stateOverlayPane'
  }

  return (
    <>
      <Pane name="stateOverlayPane" style={{ zIndex: 450 }} />
      <Pane name="stateMarkerPane" style={{ zIndex: 650 }} />

      {features?.map((f, k) => (
        <GeoJSON
          key={k}
          data={f}
          {...geojsonOpts}
        />
      ))}
    </>
  )
}

export default FeatureManager
