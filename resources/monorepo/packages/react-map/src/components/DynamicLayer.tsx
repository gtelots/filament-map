import { WMSTileLayer } from "react-leaflet"

type TDynamicLayerProps = {
  type: 'wms' | 'geojson'
}

function DynamicLayer(props: TDynamicLayerProps){
  const { type, ...other } = props

  if(type === 'wms'){
    const opts = {
      url: '',
      format: 'image/png',
      transparent: true,
      ...other
    }

    return <WMSTileLayer {...opts} />
  }


  return null
}

export default DynamicLayer
