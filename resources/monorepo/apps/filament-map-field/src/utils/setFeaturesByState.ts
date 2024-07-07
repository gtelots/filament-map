import { nanoid } from '@reduxjs/toolkit'
import { feature, featureCollection, lineString, multiPoint, point, polygon } from '@turf/helpers'
import { getCoords, getType } from '@turf/invariant'
import { flattenEach } from '@turf/meta'

function setFeaturesByState({ state, setFeatures }) {
  const type = getType(state)

  if (type === 'MultiPoint') {
    setFeatures(
      getCoords(state).map((coord) => ({
        id: nanoid(),
        ...point(coord),
      })),
    )
  } else if (type === 'MultiLineString') {
    setFeatures(
      getCoords(state).map((coord) => ({
        id: nanoid(),
        ...lineString(coord),
      })),
    )
  } else if (type === 'MultiPolygon') {
    setFeatures(
      getCoords(state).map((coord) => ({
        id: nanoid(),
        ...polygon(coord),
      })),
    )
  } else if (['Point', 'LineString', 'Polygon'].includes(type)) {
    setFeatures([
      {
        id: nanoid(),
        ...feature(state),
      },
    ])
  } else if(type === 'GeometryCollection'){
    let newFeatures = [] as any
    flattenEach(state, (currentFeature) => newFeatures.push({id: nanoid(), ...currentFeature}))
    setFeatures(newFeatures)
  }
}

export default setFeaturesByState
