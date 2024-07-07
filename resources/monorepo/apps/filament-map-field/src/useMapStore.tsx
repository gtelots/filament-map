import { createEntityAdapter, nanoid } from '@reduxjs/toolkit'
import { createContext, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { TConfig } from './types'
import { castArray } from 'lodash'
import { multiLineString, multiPoint, multiPolygon } from "@turf/helpers";
import { getCoord, getCoords, getGeom } from "@turf/invariant";

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
  addFeature: (feature) => set(state => {
    featuresAdapter.addOne(state, {id: nanoid(), ...feature})
  }),

  removeFeature: (id: string) => set(state => {
    featuresAdapter.removeOne(state, id)
  }),

  setFeatures: (features) => set(state => {
    featuresAdapter.setAll(state, features)
  }),

  removeFeatures: () => set(state => {
    featuresAdapter.removeAll(state)
  })
}) as MapActions

const MapStoreContext = createContext(null)

export const MapStoreProvider = ({ children, value }) => {
  const storeRef = useRef<any>()
  if (!storeRef.current) {
    storeRef.current = createStore<MapState & MapActions>()(immer((set, get) => ({
      ...initialState,
      ...value,
      ...actions(set, get),
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
