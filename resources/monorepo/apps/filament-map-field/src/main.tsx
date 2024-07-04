import { createRoot } from 'react-dom/client'

import './main.scss'
import App from './App'

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
        state: this.state,
        config
      }

      root.render(<App {...appProps} />)
    },
  }
}

window['filamentMapField'] = filamentMapField
