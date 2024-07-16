import { WMSTileLayer } from 'react-leaflet'
import { GeoJSON } from '../components/GeoJSON'

type TDynamicLayerProps = {
  type: 'wms' | 'geojson'
}

function DynamicLayer(props: TDynamicLayerProps) {
  const { type, ...other } = props

  if (type === 'wms') {
    const opts = {
      url: '',
      format: 'image/png',
      transparent: true,
      ...other,
    }

    return <WMSTileLayer {...opts} />
  }

  if (type === 'geojson') {
    const opts =  {
      // @ts-ignore
      data: JSON.parse(other.data),
      pmIgnore: true
    }
    return <GeoJSON {...opts}/>
  }

  return null
}

export default DynamicLayer
