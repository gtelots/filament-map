import { getCoord } from '@turf/invariant'
import center from '@turf/center';
import flip from '@turf/flip';

function toLatLng(data) {
  if (!data) return data

  return getCoord(flip(center(data)))
}

export default toLatLng
