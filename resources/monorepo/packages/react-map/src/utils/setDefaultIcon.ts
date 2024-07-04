// @ts-nocheck
import L from 'leaflet'
import MarkerIcon from 'leaflet/dist/images/marker-icon.png'
import MarkerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import MarkerShadowIcon from 'leaflet/dist/images/marker-shadow.png'

function setDefaultIcon(options = {}) {
  L.Icon.Default.mergeOptions({
    iconUrl: MarkerIcon as any,
    iconRetinaUrl: MarkerIcon2x as string,
    shadowUrl: MarkerShadowIcon as string,
    ...options
  })
}

export default setDefaultIcon
