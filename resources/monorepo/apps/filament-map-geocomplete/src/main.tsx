function filamentMapGeoautocomplete(
  {
    state,
    config,
    mapEl
  },
) {
  return {
    state,
    init: function () {
      console.log(state, config)
    },
  }
}

window['filamentMapGeoautocomplete'] = filamentMapGeoautocomplete
