import types from '../types/user'
import { myAxios } from 'src/utils/interaction'

const state = {
    allItemList: [],
    inList:[],
    outList:[]
}

const actions = {
    [types.actions.getMyInfo]: (context) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'homepage/info',
            }).then(function(res){
                if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,res.data.data)
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
    },
    [types.actions.exit]: (context) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'homepage/exit',
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
    },
    [types.actions.getItemList]: (context) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'homepage/getItemList',
            }).then(function(res){
                if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                        allItemList: res.data.data
                    })
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
    },
    [types.actions.getInList]: (context) => {
      //context: commit,dispatch,getters,state
      return new Promise((resolve, reject) => {
        myAxios({
          method: 'POST',
          url: 'homepage/getInList',
        }).then(function (res) {
          if (res.data.state.toString() === "1") {
            context.commit(types.mutations.setInfo, {
              inList: res.data.data
            })
            resolve({
              state: true,
              info: res.data.stateInfo
            })
          } else {
            resolve({
              state: false,
              info: res.data.stateInfo
            })
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    },
    [types.actions.getOutList]: (context) => {
      //context: commit,dispatch,getters,state
      return new Promise((resolve, reject) => {
        myAxios({
          method: 'POST',
          url: 'homepage/getOutList',
        }).then(function (res) {
          if (res.data.state.toString() === "1") {
            context.commit(types.mutations.setInfo, {
              outList: res.data.data
            })
            resolve({
              state: true,
              info: res.data.stateInfo
            })
          } else {
            resolve({
              state: false,
              info: res.data.stateInfo
            })
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    },
    [types.actions.addItem]: (context, data) => {
        //context: commit,dispatch,getters,state
        return new Promise((resolve, reject) => {
            myAxios({
                method: 'POST',
                url: 'homepage/addItem',
                data: data
            }).then(function(res){
                if(res.data.state.toString()==="1"){
                    var allItemList = context.state.allItemList;
                    allItemList.push(res.data.data)
                    context.commit(types.mutations.setInfo,{
                        allItemList: allItemList
                    })
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
    },
    [types.actions.addProducer]: (context, data) => {
      //context: commit,dispatch,getters,state
      return new Promise((resolve, reject) => {
        myAxios({
          method: 'POST',
          url: 'homepage/addProducer',
          data: data
        }).then(function (res) {
          if (res.data.state.toString() === "1") {
            
            resolve({
              state: true,
              info: res.data.stateInfo
            })
          } else {
            resolve({
              state: false,
              info: res.data.stateInfo
            })
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    },
    [types.actions.addCustomer]: (context, data) => {
      //context: commit,dispatch,getters,state
      return new Promise((resolve, reject) => {
        myAxios({
          method: 'POST',
          url: 'homepage/addCustomer',
          data: data
        }).then(function (res) {
          if (res.data.state.toString() === "1") {

            resolve({
              state: true,
              info: res.data.stateInfo
            })
          } else {
            resolve({
              state: false,
              info: res.data.stateInfo
            })
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    },

    [types.actions.inStore]: (context, data) => {
      //context: commit,dispatch,getters,state
      return new Promise((resolve, reject) => {
        myAxios({
          method: 'POST',
          url: 'homepage/beInStore',
          data: data
        }).then(function (res) {
          if (res.data.state.toString() === "1") {
            resolve({
              state: true,
              info: res.data.stateInfo
            })
          } else {
            resolve({
              state: false,
              info: res.data.stateInfo
            })
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    },
    [types.actions.outStore]: (context, data) => {
      //context: commit,dispatch,getters,state
      return new Promise((resolve, reject) => {
        myAxios({
          method: 'POST',
          url: 'homepage/beOutStore',
          data: data
        }).then(function (res) {
          if (res.data.state.toString() === "1") {
            resolve({
              state: true,
              info: res.data.stateInfo
            })
          } else {
            resolve({
              state: false,
              info: res.data.stateInfo
            })
          }
        }).catch(function (err) {
          reject(err)
        })
      })
    },
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
