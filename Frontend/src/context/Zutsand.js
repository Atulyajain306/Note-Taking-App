import create from "zustand"
const useZustand=create((set)=>({
    selectedcard:null,
    setSelectedcard:(selectedId)=>set({selectedId})
}))
export default useZustand