import Vue from 'vue'
import Vuex from 'vuex'
import url from '../database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: []
  },
  mutations: {
    SET_List(state, payload) {
      state.todoList = payload
    },
    ADD_List(state, payload) {
      state.todoList.push(payload)
    },
    REMOVE_List(state, payload) {
      let temp = state.todoList.filter(todo => todo.id != payload);
      state.todoList = temp;
    },

  },
  actions: {
    getTodoList({ commit, state }) {
      Vue.axios({
        url: `${url}todo`,
        method: "GET",
        headers: { access_token: localStorage.access_token }
      }).then(res => {
        commit('SET_List', res.data.todos)
      }).catch(err => {
        console.log(err)
      })
    },
  },
  modules: {
  }
})
