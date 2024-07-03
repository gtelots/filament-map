import { Control } from 'leaflet'

declare module "leaflet" {
  namespace Control {
    class FullScreen extends Control {
      constructor(options?: any);
    }
  }
}
