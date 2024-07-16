import { useEffect } from "react";
import { useMapStore } from "react-map";

function LayerManager(){
  const layers = useMapStore(state => state.config.layers)
  const setConfig = useMapStore(state => state.setConfig)


  useEffect(() => {
    setTimeout(() => {
      setConfig()
    }, 2000)

  }, [])

  console.log(layers);

  return null;
}

export default LayerManager
