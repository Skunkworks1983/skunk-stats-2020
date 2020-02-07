import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const defaultState = () => {
  return {
    team: null,
    match: null,
    event: null,
    token: new String,
    name: new String
  }
}

export default new Vuex.Store({
  strict: true, // Prevents mutations other than those defined
  plugins: [createPersistedState()],
  state: defaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token
    },
    getUser: state => {
      return state.name
    }
  },
  mutations: {
    setName: (state, name) => {
      state.name = name;
    },
    setToken: (state, token) => {
      state.token = token;
    },
    setTeam: (state, team) => {
      state.team = team
    },
    setEvent: (state, event) => {
      state.event = event
    },
    setMatch: (state, match) => {
      state.match = match
    },
    reset: state => {
      Object.assign(state, defaultState());
    }
  },
  actions: {
    login: ({
      commit,
      dispatch
    }, {
      token,
      name
    }) => {
      commit('setToken', token);
      commit('setName', name);
      // set auth header globally
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout: ({
      commit
    }) => {
      commit('reset', '');
    }
  }
})