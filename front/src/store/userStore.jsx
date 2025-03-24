import { create } from "zustand";
import axios from "axios";

const userStore = create((set) => ({
    user: {
        id: "1",
        name: "mango",
        email: "",
        password: ""
    },

    fetchUser: async () => {
        const response = await axios.get("http://localhost:8080/api/member");
        set({ user: response.data });
    }
}));

export default userStore;