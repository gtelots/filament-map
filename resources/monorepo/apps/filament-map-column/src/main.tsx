import { createRoot } from 'react-dom/client';
import './main.scss'
import App from './App';

function filamentMapColumn(
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

window['filamentMapColumn'] = filamentMapColumn
