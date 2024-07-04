import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

function App() {
  const mapOptions = {
    center: [51.505, -0.09],
    zoom: 13,
    style: {
      height: '100%',
    },
    zoomControl: false,
    attributionControl: false,
    whenReady: ({ target: map }) => {
      setTimeout(() => map.invalidateSize(), 100)
    }
  } as any

  return (
    <MapContainer {...mapOptions}>
      <TileLayer
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default App
