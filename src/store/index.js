import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "",
        pics: [],
        id: 0,
        clipData: null,
        total: 0,
        tags: []
        // tags: ["家庭", "绘画", "建筑", "生活", "乐器", "卡通人物", "儿童", "人物", "男性", "创意情景", "矢量", "婚礼", "动漫", "动物", "插画", "婚纱照", "时尚", "卡通插图", "情景", "抽象", "表情", "其他卡通", "古典"]
    },
    mutations: {
        changeClipData(state, value){
            state.clipData = value;
        },
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
        },
        changeTags(state, value){
            state.tags = value; 
        },
        addTag(state, value){
            if(state.tags.indexOf(value) == -1){
                state.tags.push(value);
            }
        },
        changeTotal(state, value){
            state.total = value; 
        }
    },
    actions: {

    }
});
