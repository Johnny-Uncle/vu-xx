import { LoginApi } from '../api/login'
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
};
const getters = {

};
const mutations = {
    SET_COLLAPSE(state){
        state. isCollapse = !state.isCollapse;
        sessionStorage.setItem('isCollapse',JSON.stringify(state. isCollapse));
    }
};
const actions = {
        login(content,repuestData){
            return new Promise((resolve,reject) => {
                LoginApi(repuestData).then((response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
