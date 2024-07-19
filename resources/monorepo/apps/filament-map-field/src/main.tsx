import { createRoot } from 'react-dom/client'
import Alpine from 'alpinejs'

import './main.scss'
import App from './App'
import { cloneDeep, pick } from 'lodash';
import { MapStoreProvider } from 'react-map';

function filamentMapField(
  {
    state,
    config,
    mapEl
  },
) {
  return {
    state,
    init: function () {
      // console.log(state, config);

      const root = createRoot(mapEl)

      const appProps: any = {
        $root: this['$root'],
        $watch: this['$watch'],
        $wire: this['$wire'],
        state: cloneDeep(Alpine.raw(this.state)),
        config
      }

      root.render((
        <MapStoreProvider value={pick(appProps, ['$wire', 'state', 'config'])}>
          <App {...appProps} />
        </MapStoreProvider>
      ))
    },
  }
}

window['filamentMapField'] = filamentMapField
