import { createEntityAdapter } from '@reduxjs/toolkit'
import { createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { TConfig } from './types'
import { castArray } from 'lodash'

type MapState = {
  $wire: any
  $watch: any
  state: any
  config: TConfig
}

type MapActions = {
  setFeatures: (features) => void
}

const featuresAdapter = createEntityAdapter()

export const featuresSelectors = featuresAdapter.getSelectors<any>((state) => state)

const initialState: MapState = featuresAdapter.getInitialState({
    $wire: null,
    $watch: null,
    state: null,
    config: {} as any,
}) satisfies MapState as MapState

const actions = (set: any, get: any) => ({
  setFeatures: (features) => {
    set(state => {
      featuresAdapter.setAll(state, castArray(features))
    })
  },
}) as MapActions

const MapStoreContext = createContext(null)

export const MapStoreProvider = ({ children, value }) => {
  const storeRef = useRef<any>()
  if (!storeRef.current) {
    storeRef.current = createStore<MapState & MapActions>()(immer((set) => ({
      ...initialState,
      ...value,
      ...actions(set, set),
      reset: () => ({
        ...initialState,
        ...value,
      })
    })))
  }
  return (
    <MapStoreContext.Provider value={storeRef.current}>
      {children}
    </MapStoreContext.Provider>
  )
}

export const useMapStore = (selector) => {
  const store = useContext(MapStoreContext)
  if (!store) {
    throw new Error('Missing MapStoreProvider')
  }
  return useStore(store, selector) as any
}

export default useMapStore
