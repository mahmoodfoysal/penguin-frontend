import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'pinia-state',
  state: () => ({
    berer: JSON.parse(sessionStorage.getItem('berer')) || null,
    userInfo: null,
  }),
  actions: {
    setBerer(data) {
      this.berer = data
    },
    setUserInfo(data) {
      this.userInfo = data
    },
  },
  getters: {},
})
