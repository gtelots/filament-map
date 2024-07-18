import {
  AttributionControl,
  LayersControl,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'
import { GeomanControls } from 'react-leaflet-geoman-v2'
import { FullscreenControl } from '../controls/FullscreenControl'
import { useMapStore } from '../hooks/useMapStore'
import { map as _map } from 'lodash'
import { Fragment, useMemo } from 'react'
import DynamicLayer from './DynamicLayer'

const controlComponents = {
  zoomControl: ZoomControl,
  layersControl: LayersControl,
  drawControl: GeomanControls,
  attributionControl: AttributionControl,
  scaleControl: ScaleControl,
  fullscreenControl: FullscreenControl,
}

const defaultDrawControlOptions = {
  drawMarker: false,
  drawCircle: false,
  drawCircleMarker: false,
  drawPolyline: false,
  drawRectangle: false,
  drawPolygon: false,
  drawText: false,

  editMode: true,
  dragMode: false,
  cutPolygon: false,
  removalMode: true,
  rotateMode: false,
}

function ControlManager() {
  const [geomType, layers, baseLayers, _controls] = useMapStore((state) => [
    state.config.geomType,
    state.config.layers,
    state.config.baseLayers,
    state.config.controls,
  ])

  const [addFeature, removeFeature, removeFeatures] = useMapStore((state) => [
    state.addFeature,
    state.removeFeature,
    state.removeFeatures,
  ])

  const handleCreate = (e) => {
    e.target.removeLayer(e.layer)

    if (['Point', 'LineString', 'Polygon'].includes(geomType)) removeFeatures()

    addFeature(e.layer.toGeoJSON())
  }

  const handleRemove = ({ layer, target }) => {
    const id = layer.feature.id

    id && removeFeature(id)
  }

  const controls = useMemo(() => _map(_controls, (opts, name) => {
    const Component = controlComponents[name]
    if (!opts || opts?.enabled == false || !Component) return null

    let options = { ...opts }
    let children: any = null

    if (name === 'layersControl') {

      children = (
        <Fragment>
          {baseLayers?.map(
            ({ selected = false, title = 'None', ...layerProps }, k) => (
              <LayersControl.BaseLayer key={k} name={title} checked={selected}>
                <TileLayer url="" {...layerProps} />
              </LayersControl.BaseLayer>
            ),
          )}

          {layers?.map(
            ({ selected = false, title = 'None', ...layerProps }, k) => (
              <LayersControl.Overlay key={k} name={title} checked={selected}>
                <DynamicLayer {...(layerProps as any)} />
              </LayersControl.Overlay>
            ),
          )}
        </Fragment>
      )
    }

    if (name === 'drawControl') {
      options = {
        ...options,
        options: defaultDrawControlOptions,
      }

      if (['Point', 'MultiPoint'].includes(geomType)) {
        options.options = {
          ...options.options,
          drawMarker: true,
          editMode: true,
          removalMode: true,
        }
      } else if (['LineString', 'MultiLineString'].includes(geomType)) {
        options.options = {
          ...options.options,
          drawPolyline: true,
          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true,
        }
      } else if (['Polygon', 'MultiPolygon'].includes(geomType)) {
        options.options = {
          ...options.options,
          drawRectangle: true,
          drawPolygon: true,
          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true,
        }
      } else {
        options.options = {
          ...options.options,
          drawMarker: true,
          drawCircle: true,
          drawPolyline: true,
          drawRectangle: true,
          drawPolygon: true,

          editMode: true,
          dragMode: true,
          cutPolygon: true,
          removalMode: true,
          rotateMode: true,
        }
      }

      options.onCreate = handleCreate
      options.onMapRemove = handleRemove
    }

    return <Component key={name} {...options} children={children} />
  }).filter((v) => v), [JSON.stringify(_controls)])

  return controls.map((control: any) => control)
}

export default ControlManager
