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

  const [data, setData] = useState(null as any)

  useEffect(() => {
    if (dataUrl) {
      fetch(dataUrl)
        .then((resp) => resp.json())
        .then((resp) => {
          setData(resp)
        })
    }
  }, [dataUrl])

  return (
    <GeoJSON {...opts} data={data}>
      {isFunction(children) && data && children(data)}
    </GeoJSON>
  )
}

export default GeoJSONAjax
