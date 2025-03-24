import {create} from "zustand";

const modeStore = create((set) => ({
    mode: "gallery",
    toggle: () => set((state) => state === "gallery" ? "kanban" : "gallery")
}));

export default modeStore;