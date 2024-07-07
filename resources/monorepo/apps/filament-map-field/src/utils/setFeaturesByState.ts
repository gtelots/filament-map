import { nanoid } from '@reduxjs/toolkit'
import { feature, lineString, point, polygon } from '@turf/helpers'
import { getCoords, getType } from '@turf/invariant'

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
  }
}

export default setFeaturesByState
