import { createRoot } from 'react-dom/client'
import App from './App'

import './main.scss'

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
        state: this.state,
        config
      }

      root.render(<App {...appProps} />)
    },
  }
}

window['filamentMapEntry'] = filamentMapEntry
