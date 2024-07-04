import { useMapEvents } from 'react-leaflet'

function MapEvents(){
  useMapEvents({
    click: (e) => {
      // console.log(e)
    }
  })

  return null
}

export default MapEvents
