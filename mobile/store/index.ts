
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => {
        return {
            id: '',
            digest: '',
            uid: '',
            token: '',
        }
    },

    actions: {
        setId(newValue) {
            this.id = newValue
        },
        setDigest(newValue) {
            this.digest = newValue
        },
        setUid(newValue) {
            this.uid = newValue
        },
        setToken(newValue) {
            this.token =- newValue
        },
    },

})