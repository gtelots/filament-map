import { useEffect, useState } from 'react'
import { GeoJSON } from './GeoJSON'
import { isFunction } from 'lodash'

type TGeoJSONAjax = {
  dataUrl: string
  pmIgnore?: boolean
  children?: any
}

function GeoJSONAjax(props: TGeoJSONAjax) {
  const { dataUrl, children, ...opts } = props

  const [enabled, setEnabled] = useState(false)
  const [data, setData] = useState(null as any)

  useEffect(() => {
    if (enabled && dataUrl) {
      fetch(dataUrl)
        .then((resp) => resp.json())
        .then((resp) => {
          setData(resp)
        })
    }
  }, [enabled, dataUrl])

  return (
    <GeoJSON
      {...opts}
      data={data}
      eventHandlers={{
        add: (event) => {
          setEnabled(true)
        },
        remove: (event) => {
          setEnabled(false)
        },
      }}
    >
      {isFunction(children) && data && children(data)}
    </GeoJSON>
  )
}

export default GeoJSONAjax
