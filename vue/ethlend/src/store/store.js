import Vue from 'vue'
import Vuex from 'vuex'
import web3_module from './modules/web3_module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    web3_module
  }
});
