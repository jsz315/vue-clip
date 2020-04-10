import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pics: [],
        id: 0
    },
    mutations: {
        changePics(state, value){
            state.pics = value;
        },
        changeId(state, value){
            state.id = value;
        },
        changeNext(state){
            if(++state.id == state.pics.length){
                state.id = 0;
            }
        },
        changePrev(state){
            if(--state.id < 0){
                state.id = state.pics.length - 1;
            }
        }
    },
    actions: {

    }
});
