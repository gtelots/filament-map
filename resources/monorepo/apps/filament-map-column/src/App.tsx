import Tippy from '@tippyjs/react'
import { MapContainer, TileLayer } from 'react-leaflet'

function App() {
  const mapOptions = {
    center: [51.505, -0.09],
    zoom: 13,
    style: {
      width: '350px',
      height: '200px',
      margin: '-5px -9px',
    },
    zoomControl: false,
    attributionControl: false,
    whenReady: ({ target: map }) => {
      setTimeout(() => map.invalidateSize(), 1000)
    },
  } as any

  return (
    <Tippy
      interactive
      theme='light'
      // visible={true}
      appendTo={() => document.body}
      content={
        <MapContainer {...mapOptions}>
          <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      }
    >
      <button>Map</button>
    </Tippy>
  )
}

export default App
