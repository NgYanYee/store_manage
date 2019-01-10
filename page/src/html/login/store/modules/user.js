import types from '../types/user'
import { myAxios } from 'src/utils/interaction'

const state = {
   allDepartmentList: []
}

const actions = {
    [types.actions.Login]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'homepage/login',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="1"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo,
                    })
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    },
    [types.actions.Register]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'homepage/register',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="1"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
        })
    }
}

const mutations = {
    [types.mutations.setInfo]: (state, datas) => {
        Object.assign(state,datas)
    },
}

export default {
  state,
  actions,
  mutations
};
