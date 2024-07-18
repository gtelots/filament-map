import { WMSTileLayer } from 'react-leaflet'
import { GeoJSON } from '../components/GeoJSON'
import { isString } from 'lodash'
import GeoJSONAjax from './GeoJSONAjax'
import PopupTemplate from './PopupTemplate'
import { renderToString } from 'react-dom/server'
import L from 'leaflet'

type TDynamicLayerProps = {
  type: 'wms' | 'geojson'

  data?: Record<string, any> | string
  dataUrl?: string

  popupTemplate?: Record<string, any> | string
  markerOptions?: Record<string, any>
  polylineOptions?: Record<string, any>
  polygonOptions?: Record<string, any>
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
    let opts = {
      // pmIgnore: true,
      pointToLayer: (point, latlng) => {
        let markerOpts = {...other.markerOptions}
        if(markerOpts.icon) markerOpts.icon = L.icon(markerOpts.icon)
        return L.marker(latlng, markerOpts);
      },
      style: (feature) => {
        return {
          ...other.polylineOptions,
          ...other.polygonOptions,
        }
      },
      onEachFeature: (feature, layer) => {
        popupTemplate &&
          layer.bindPopup(() => {
            return renderToString(
              <PopupTemplate data={feature?.properties} {...tplPopupProps} />,
            )
          })
      },
    } as any

    if (other.data) {
      opts = {
        ...opts,
        data: isString(other.data) ? JSON.parse(other.data as any) : other.data,
      }

      return <GeoJSON {...opts} />
    }

    if (other.dataUrl) {
      opts = {
        ...opts,
        dataUrl: other.dataUrl,
      }

      return <GeoJSONAjax {...opts} />
    }
  }

  return null
}

export default DynamicLayer
