import '@shared/style.scss'

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

    },
  }
}

window['filamentMapField'] = filamentMapField
