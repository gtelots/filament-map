import { createRoot } from 'react-dom/client'
import Alpine from 'alpinejs'

import './main.scss'
import App from './App'
import { MapStoreProvider } from './useMapStore';
import { cloneDeep, pick } from 'lodash';

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

window['filamentMapField'] = filamentMapField
