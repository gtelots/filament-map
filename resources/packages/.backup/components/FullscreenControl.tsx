import { createControlComponent } from '@react-leaflet/core'
import { Control, ControlPosition } from 'leaflet'
import 'leaflet.fullscreen'
import 'leaflet.fullscreen/Control.FullScreen.css'

export type FullscreenOptions = {
  content?: string | undefined;
  position?: ControlPosition | undefined;
  title?: string | undefined;
  titleCancel?: string | undefined;
  forceSeparateButton?: boolean | undefined;
  forcePseudoFullscreen?: boolean | undefined;
  fullscreenElement?: false | HTMLElement | undefined;
}

export const FullscreenControl = createControlComponent<
  Control.FullScreen,
  FullscreenOptions
>(function createFullscreenControl(props) {
  return new Control.FullScreen(props)
})
