import WebIM from "../utils/WebIM";

// import WebIM from "../utils/WebIM";

// TODO 处理页面刷新无法获取到音频url
const res = function(response){
	let objectUrl = WebIM.utils.parseDownloadResponse.call(WebIM.conn, response);
	return objectUrl;  //  'blob:http://localhost:8080/536070e2-b3a0-444a-b1cc-f0723cf95588'
};

function test(url, func){
	let options = {
		url: url,
		headers: { Accept: "audio/mp3" },
		onFileDownloadComplete: func,
		onFileDownloadError: function(){
			console.log("音频下载失败");
		}
	};
	WebIM.utils.download.call(WebIM.conn, options);
}

const Chat = {
	state: {
		userList: {
			contactUserList: [],
			groupUserList: [],
			chatroomUserList: []
		},
		msgList: [],
		currentMsgs: [],
		imUser:[],
		MsgCunt:0
	},
	mutations: {
		getMsgs(state,payload){
			state.msgList.push(JSON.parse(JSON.stringify(payload)))
		},
		resMsgs(state){
			state.msgList = []
			state.imUser = []
			this.MsgCunt = 10
		},
		getUsers(state,payload){
            state.imUser.push(JSON.parse(JSON.stringify(payload)))
		},
		getCount(state,payload) {
			state.MsgCunt = payload
		}
	},
	actions: {
		onGetContactUserList: function(context, payload){
			try{
				WebIM.conn.getRoster({
					success: function(roster){
						// console.log("roster", roster);
						const userList = roster.filter(user => ["both", "to"].includes(user.subscription));
						context.commit("updateUserList", {
							userList,
							type: "contactUserList",
							black: payload
						});
					}
				});
			}
			catch(e){
				console.log("error", e);
			}
		},
		onGetGroupUserList: function(context, payload){
			var options = {
				success: function(resp){
					let userList = resp.data;
					userList.forEach((user, index) => {
						userList[index].name = user.groupname;
					});
					context.commit("updateUserList", {
						userList,
						type: "groupUserList"
					});
				},
				error: function(e){ },
			};
			WebIM.conn.getGroup(options);
		},
		onGetChatroomUserList: function(context, payload){
			var option = {
				pagenum: 1,                                 // 页数
				pagesize: 20,                               // 每页个数
				success: function(list){
					console.log('33333')
					context.commit("updateUserList", {
						userList: list.data,
						type: "chatroomUserList"
					});
				},
				error: function(){
					console.log("List chat room error");
				}
			};
			WebIM.conn.getChatRooms(option);
		},
		// 获取当前聊天对象的记录 @payload： {key, type}
		onGetCurrentChatObjMsg: function(context, payload){
			const { id, type } = payload;
			context.commit("updateCurrentMsgList", context.state.msgList[type][id]);
		},
		onSendText: function(context, payload){
			const { chatType, chatId, message } = payload;
			const id = WebIM.conn.getUniqueId();
			const time = +new Date();
			const chatroom = chatType === "chatroom";
			const type = chatType === "contact" ? "singleChat" : "groupChat";
			const jid = {
				contact: "name",
				group: "groupid",
				chatroom: "id"
			};
			const msgObj = new WebIM.message("txt", id);
			msgObj.set({
				msg: message,
				to: chatId[jid[chatType]],
				chatType: type,
				roomType: chatroom,
				success: function(){
					context.commit("updateMsgList", {
						chatType,
						chatId: chatId[jid[chatType]],
						msg: message,
						bySelf: true,
						time: time,
						mid: id,
						status: "sending"
					});
				},
				fail: function(e){
					console.log("Send private text error", e);
				}
			});
			if(chatType === "group" || chatType === "chatroom"){
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
		sendImgMessage: function(context, payload){
			const { chatType, chatId, roomType, file, callback } = payload;
			const id = WebIM.conn.getUniqueId();
			const jid = {
				contact: "name",
				group: "groupid",
				chatroom: "id"
			};
			const msgObj = new WebIM.message("img", id);
			msgObj.set({
				file: file,
				to: chatId[jid[chatType]],
				chatType:chatType,
				roomType: roomType,
				onFileUploadError: function(error){
					console.log("图片上传失败", error);
					callback();
				},
				onFileUploadComplete: function(data){
					let url = data.uri + "/" + data.entities[0].uuid;
					context.commit("updateMsgList", {
						msg: url,
						chatType,
						chatId: chatId[jid[chatType]],
						bySelf: true,
						type: "img",
						time: data.timestamp,
						mid: id,
						status: "sending"
					});
					callback();
				},
				success: function(){
					console.log("图片发送成功");
				}
			});
			if(chatType === "group" || chatType === "chatroom"){
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
		sendFileMessage: function(context, payload){
			const { chatType, chatId, roomType, file, callback } = payload;
			const id = WebIM.conn.getUniqueId();
			const jid = {
				contact: "name",
				group: "groupid",
				chatroom: "id"
			};
			const msgObj = new WebIM.message("file", id);
			msgObj.set({
				file: file,
				ext: {
					file_length: file.data.size
				},
				to: chatId[jid[chatType]],
				chatType:chatType,
				roomType: roomType,
				onFileUploadError: function(error){
					console.log("文件上传失败", error);
					callback();
				},
				onFileUploadComplete: function(data){
					let url = data.uri + "/" + data.entities[0].uuid;
					context.commit("updateMsgList", {
						msg: url,
						chatType,
						chatId: chatId[jid[chatType]],
						bySelf: true,
						type: "file",
						filename: file.data.name,
						file_length: file.data.size,
						time: data.timestamp,
						mid: id,
						status: "sending"
					});
					callback();
				},
				success: function(){
					console.log("文件发送成功");
				}
			});
			if(chatType === "group" || chatType === "chatroom"){
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
		sendRecorder: function(context, payload){
			const { useId, type, file } = payload;
			const id = WebIM.conn.getUniqueId();
			const msgObj = new WebIM.message("audio", id);
			let isRoom = type == "chatroom" || type == "groupchat";
            
			const jid = {
				contact: "name",
				group: "groupid",
				chatroom: "id"
			};
            
			// console.log('bold>>>', bold);
			// console.log('newBold>>', WebIM.utils.parseDownloadResponse.call(WebIM.conn, bold));
			// let newBold = WebIM.utils.parseDownloadResponse.call(WebIM.conn, bold)
			// var file = WebIM.utils.getFileUrl(input);
			msgObj.set({
				file: file,
				to: useId,
				type: "audio",
				roomType: isRoom,

				onFileUploadError: function(error){
					console.log("语音上传失败", error);
				},
				onFileUploadComplete: function(data){
					console.log("上传成功", data);
                    
					let url = data.uri + "/" + data.entities[0].uuid;
					context.commit("updateMsgList", {
						msg: url,
						chatType: type,
						chatId: useId,
						bySelf: true,
						type: "audio",
						filename: file.data.name,
						// file_length: file.data.size,
						// time: data.timestamp,
						mid: id,
						status: "sending"
					});
				},
				success: function(data){
					console.log("语音发送成功", data);
				},
				flashUpload: WebIM.flashUpload
			});
            
			if(type === "group" || type === "chatroom"){
				msgObj.setGroup("groupchat");
			}
			WebIM.conn.send(msgObj.body);
		},
	},
	getters: {
		onGetContactUserList(state){
			return state.userList.contactUserList;
		},
		onGetGroupUserList(state){
			return state.userList.groupUserList;
		},
		onGetChatroomUserList(state){
			return state.userList.chatroomUserList;
		},
		onGetCurrentChatObjMsg(state){
			return state.currentMsgs;
		},
		fetchHistoryMessages(state){
			return state.currentMsgs;
		}
	}

};
export default Chat;
