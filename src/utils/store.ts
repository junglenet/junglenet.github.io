import create from 'zustand'

const useStore = create((): any => {
  return {
    router: null,
    dom: null,
    width: null,
  }
})

export default useStore
