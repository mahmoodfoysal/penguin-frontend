import { defineStore } from "pinia";

export const useStore = defineStore({
    id: 'pinia-state',
    state: () => ({
        berer: null,
        user_info:  null,
    }),
    actions: {
        setBerer(data) {
            this.berer = data;
        },
        setUserInfo(data) {
            this.user_info = data;
        }
    },
    getters: {

    }
})
