import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles.scss'

import setDefaultIcon from './utils/setDefaultIcon.ts'

setDefaultIcon()

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

export default filamentMapField

