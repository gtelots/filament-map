import { WMSTileLayer } from 'react-leaflet'
import { GeoJSON } from '../components/GeoJSON'
import { isString } from 'lodash'
import GeoJSONAjax from './GeoJSONAjax'
import PopupTemplate from './PopupTemplate'
import { renderToString } from 'react-dom/server'

type TDynamicLayerProps = {
  type: 'wms' | 'geojson'

  data?: Record<string, any> | string
  dataUrl?: string

  popupTemplate: Record<string, any> | string
}

function DynamicLayer(props: TDynamicLayerProps) {
  const { type, popupTemplate, ...other } = props

  let tplPopupProps = popupTemplate
    ? isString(popupTemplate)
      ? { template: popupTemplate }
      : popupTemplate
    : {}

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
    if (other.data) {
      const opts = {
        data: isString(other.data) ? JSON.parse(other.data as any) : other.data,
        pmIgnore: true,
        onEachFeature: (feature, layer) => {
          popupTemplate &&
            layer.bindPopup(() => {
              return renderToString(
                <PopupTemplate data={feature?.properties} {...tplPopupProps} />,
              )
            })
        },
      }

      return <GeoJSON {...opts} />
    }

    if (other.dataUrl) {
      const opts = {
        dataUrl: other.dataUrl,
        pmIgnore: true,
        onEachFeature: (feature, layer) => {
          popupTemplate &&
            layer.bindPopup(() => {
              return renderToString(
                <PopupTemplate data={feature?.properties} {...tplPopupProps} />,
              )
            })
        },
      }

      return <GeoJSONAjax {...opts} />
    }
  }

  return null
}

export default DynamicLayer
