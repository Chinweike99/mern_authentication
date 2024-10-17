import { create } from 'zustand'

//Prefix your function with use
export const useAuthStore = create((set) => ({
    // Initializing the 'auth' object in the store with default values
    auth: {
        username: "", // Default username is an empty string
        active: false //Default active state is false (not authenticated)
    },
    setUsername:(name) => set((state) => ({ // 'set' is a function that updates the state
        // Return a new state object with the updated 'auth' object
        auth: {
            ...state.auth,  // Spread the existing auth state
            username: name  // Update the username with the provided 'name'
        }
    
    }))
}))