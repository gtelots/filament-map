import { createRoot } from 'react-dom/client'
import Alpine from 'alpinejs'
import App from './App'

import './main.scss'
import { cloneDeep, pick } from 'lodash';
import { MapStoreProvider } from 'react-map';


function filamentMapEntry(
  {
    state,
    config,
    mapEl
  },
) {
  return {
    state,
    init: function () {
      console.log(state, config);

      const root = createRoot(mapEl)

      const appProps: any = {
        $wire: this['$wire'],
        $watch: this['$watch'],
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

window['filamentMapEntry'] = filamentMapEntry
