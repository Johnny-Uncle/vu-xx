import { LoginApi } from "../api/login";
import { setToken,setUserName,getUserName,removeToken,removeUserName } from "../utils/app"


const state = {
    to_ken : '',
    user_Name: getUserName() || '' ,
};

const getters = {
};

const mutations = {
    // token
    SET_TOKEN( state,value ){
        state.to_ken = value
    },
    SET_USERNAME( state,value ){
        state.user_Name = value
    },
};

const actions = {
    login({ commit }, repuestData) {
        return new Promise((resolve, reject) => {
            LoginApi(repuestData).then((response) => {
                let data = response.data.data;
                console.log(response)
                // 存储 { token ，username } 解构的方式
                commit('SET_TOKEN',data.token);
                commit('SET_USERNAME',data.username);
                // setToken设置
                setToken(data.token);
                setUserName(data.username);
                /*
                *  普通的方式
                *  content.commit('SET_TOKEN',data.token);
                *  content.commit('SET_TOKEN',data.token);
                * */
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 退出按钮
    exit({commit}){
        new Promise((resolve, reject) => {
            console.log(111)
            removeUserName();
            removeToken();
            commit('SET_TOKEN','');
            commit('SET_USERNAME','');
            resolve();
            reject();
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
