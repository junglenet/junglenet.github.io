import create from 'zustand'

const useStore: any = create((set): any => {
  return {
    router: null,
    dom: null,
    width: null,
    target: null, 
    setTarget: (target) => set({ target })
  }
  
})

export default useStore
