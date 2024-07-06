import { bbox } from '@turf/bbox'

function toBounds(data: any){
  const arr = bbox(data)

  return [
    [arr[1], arr[0]],
    [arr[3], arr[2]]
  ]
}

export default toBounds
