import { debounce, get } from 'lodash'
import Alpine from 'alpinejs'
import urlcat from 'urlcat'
import './main.scss'

function filamentMapGeocomplete({ config, setStateUsing }) {
  return {
    open: false,

    suggestions: [],

    result: null as any,

    init: function () {
      const geocompleteEl = config.statePath
      const geoComplete = document.getElementById(geocompleteEl)

      if (geoComplete) {
        geoComplete.addEventListener(
          'keydown',
          (e: any) => {
            if (e.key === 'U+000A' || e.key === 'Enter' || e.code === 'Enter') {
              if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
                e.preventDefault()

                return false
              }
            }
          },
          true,
        )

        const handleInputChange = debounce((e: any) => {
          const text = e.target.value as string

          if (text.length > 0) {
            this.getSuggestions(text)
          } else {
            this.suggestions = []
          }
        }, 500)

        geoComplete.addEventListener('input', handleInputChange)
      }
    },

    getSuggestions: function (input) {
      return fetch(
        urlcat(config.autocompleteUrl, {
          ...config.autocompleteParams,
          input,
        }),
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.suggestions = resp.predictions
        })
    },

    handleSelect: function (place) {
      const { place_id } = place
      this.open = false

      fetch(
        urlcat(config.detailUrl, {
          place_id,
          key: config.googleMapsAPIKey,
        }),
      )
        .then((resp) => resp.json())
        .then((resp) => {
          this.result = resp.result

          if (!this.result?.geometry || !this.result?.geometry?.location) {
            window.alert(
              "No details available for input: '" + this.result?.name + "'",
            )
            return
          }

          const location = get(this.result, 'geometry.location') as any

          setStateUsing(config.statePath, get(this.result, 'formatted_address'))

          config.latitudeField &&
            setStateUsing(config.latitudeField, location.lat)
          config.longitudeField &&
            setStateUsing(config.longitudeField, location.lng)

          const geocompleteDom = document.getElementById(config.statePath) as any
          geocompleteDom.dispatchEvent(
            new CustomEvent('filament-map::geocompleteSelected', {
              detail: resp.result,
              bubbles: true,
            }),
          )
        })
    },
  }
}

window['filamentMapGeocomplete'] = filamentMapGeocomplete
