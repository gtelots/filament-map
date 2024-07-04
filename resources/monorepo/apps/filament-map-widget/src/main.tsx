function filamentMapWidget(
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

window['filamentMapWidget'] = filamentMapWidget
