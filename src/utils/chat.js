// import Chat from '@/store/chat'
// import Vue from 'vue'
const chat = {
    // console.log('获取数据')
    getHistoryMessage: function(context, payload){
        // console.log('666',localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).userId)
        // console.log('用户名id',localStorage.getItem("group_no"))
        const options = {
            queue: localStorage.getItem("group_no"),
            isGroup: true,
            count: Vue.$store.state.chat.MsgCunt+'', // 每次获取消息条数
            success: function(msgs){
                try{
                    // console.log('处理数据',msgs.length)
                    // payload.success && payload.success(msgs);
                    if(msgs.length){
                        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                        const userId = userInfo && userInfo.userId;
                        msgs.forEach((item) => {
                            let time = Number(item.time);
                            let msg = {};
                            const bySelf = item.from == userId;
                            if(!item.filename){
                                msg = {
                                    chatType: true ? "group" : "contact",
                                    chatId: bySelf ? item.to : item.from,
                                    msg: item&&item.data,
                                    bySelf: bySelf,
                                    time: time,
                                    mid: item.id,
                                    status: "read"
                                };
                                if(true){
                                    msg.chatId = item.to;
                                }
                                else{
                                    msg.chatId = bySelf ? item.to : item.from;
                                }
                            } 
                            else if(!item.ext.file_length && item.filename !== "audio" && item.filename.substring(item.filename.length - 3) !== "mp4"){ // 为图片的情况
                                msg = {
                                    msg: item.url,
                                    chatType: true ? "group" : "contact",
                                    chatId: bySelf ? item.to : item.from,
                                    bySelf: bySelf,
                                    type: "img",
                                    time: time,
                                    mid: item.id,
                                    status: "read"
                                };
                                if(true){
                                    msg.chatId = item.to;
                                }
                                else{
                                    msg.chatId = bySelf ? item.to : item.from;
                                }
                            }
                            else if(item.filename === "audio"){
                                msg = {
                                    msg: item.url,
                                    chatType: true ? "group" : "contact",
                                    chatId: bySelf ? item.to : item.from,
                                    bySelf: bySelf,
                                    type: "audio"
                                };
                                if(true){
                                    msg.chatId = item.to;
                                }
                                else{
                                    msg.chatId = bySelf ? item.to : item.from;
                                }
                            }
                            else if(item.filename.substring(item.filename.length - 3) === "mp4"){
                                msg = {
                                    msg: item.url,
                                    chatType: true ? "group" : "contact",
                                    chatId: bySelf ? item.to : item.from,
                                    bySelf: bySelf,
                                    type: "video"
                                };
                                if(true){
                                    msg.chatId = item.to;
                                }
                                else{
                                    msg.chatId = bySelf ? item.to : item.from;
                                }
                            }
                            else{
                                msg = {
                                    msg: item.url,
                                    chatType: true ? "group" : "contact",
                                    chatId: bySelf ? item.to : item.from,
                                    bySelf: bySelf,
                                    type: "file",
                                    filename: item.filename,
                                    file_length: item.file_length,
                                    time: time,
                                    mid: item.id,
                                    status: "read"
                                };
                                if(true){
                                    msg.chatId = item.to;
                                }
                                else{
                                    msg.chatId = bySelf ? item.to : item.from;
                                }
                            }
                            msg.isHistory = true;
                            msg.userName = item.from
                            Vue.$store.commit('getMsgs',msg)
                        });
                        // context.commit("updateMessageStatus", { action: "readMsgs" });
                    }else{
                        Vue.$store.commit('resMsgs')
                    }
                }
                catch(e){
                    console.log("error", e);
                }
            },
            fail: function(){ }
        };
        WebIM.conn.fetchHistoryMessages(options);
    },
}
export default chat;