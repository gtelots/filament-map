import { debounce, get } from 'lodash'
import urlcat from 'urlcat'
import './main.scss'

function filamentMapGeocomplete({ config, setStateUsing }) {
  return {
    open: false,

    suggestions: [],

    result: null,

    init: function () {
      const geocompleteEl = config.statePath
      const geoComplete = document.getElementById(geocompleteEl)

      if (geoComplete) {
        window.addEventListener(
          'keydown',
          (e: any) => {
            if (e.key === 'U+000A' || e.key === 'Enter' || e.code === 'Enter') {
              if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
                e.preventDefault()

                this.getSuggestions(e.target.value)

                return false
              }
            }
          },
          true,
        )

        const handleInputChange = debounce((e: any) => {
          const text = e.target.value as string

          if(text.length > 0){
            this.getSuggestions(text)
          } else {
            this.suggestions = []
          }
        }, 500)

        window.addEventListener('input', handleInputChange)
      }
    },

    getSuggestions: function (input) {
      return fetch(urlcat(config.autocompleteUrl, {
        ...config.autocompleteParams,
        input
      }))
        .then((resp) => resp.json())
        .then((resp) => {
          this.suggestions = resp.predictions
          console.log(resp)
        })
    },

    handleSelect: function(place) {
      const {place_id} = place
      this.open = false

      fetch(urlcat(config.detailUrl, {
        place_id,
        key: config.googleMapsAPIKey
      }))
        .then((resp) => resp.json())
        .then((resp) => {
          this.result = resp.result
          const location = get(this.result, 'geometry.location') as any

          setStateUsing(config.statePath, get(this.result, 'formatted_address'))

          config.latitudeField && setStateUsing(config.latitudeField, location.lat)
          config.longitudeField && setStateUsing(config.longitudeField, location.lng)
        })
    }
  }
}

window['filamentMapGeocomplete'] = filamentMapGeocomplete
