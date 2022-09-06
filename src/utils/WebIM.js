import config from "./WebIMConfig";
import websdk from "easemob-websdk";
import emedia from "easemob-emedia";
import webrtc from "easemob-webrtc";
import {
  Message
} from "element-ui";
import chat from './chat'

function ack(message) {
  var bodyId = message.id; // 需要发送已读回执的消息id
  var msg = new WebIM.message("read", WebIM.conn.getUniqueId());
  msg.set({
    id: bodyId,
    to: message.from
  });
  WebIM.conn.send(msg.body);
}

// 初始化IM SDK
var WebIM = {};
WebIM = window.WebIM = websdk;

// WebIM.logger.log = () => {
//   console.log(111);
// }
WebIM.config = config;
WebIM.conn = new WebIM.connection({
  appKey: WebIM.config.appkey,
  isHttpDNS: WebIM.config.isHttpDNS,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  isAutoLogin: true,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  isStropheLog: WebIM.config.isStropheLog,
  delivery: WebIM.config.delivery
});

// 注册监听回调
WebIM.conn.listen({
  onOpened: function (message) { // 连接成功回调
    // 登录或注册成功后 跳转到好友页面
    chat.getHistoryMessage()
    // const username = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).userId;
    // const path = location.pathname.indexOf("login") !== -1 || location.pathname.indexOf("register") !== -1 ? "/contact" : location.pathname;
    // const redirectUrl = `${path}?username=${username}`;
    // Vue.$router.push({ path: redirectUrl });
  },
  onError: function (message) {
    if (message.type == 0) {
      Message.error('请输入账号密码')
    } else if (message.type == 28) {
      console.log("未登陆")
    } else if (JSON.parse(message.data.data).error_description == "user not found") {
      Message.error("用户名不存在！")
    } else if (JSON.parse(message.data.data).error_description == "invalid password") {
      Message.error('密码无效！')
    } else if (JSON.parse(message.data.data).error_description == "user not activated") {
      Message.error("用户已被封禁！")
    } else if (message.type == "504") {
      Message.error("消息撤回失败");
    }
    // 报错返回到登录页面
    // Vue.$router.push({ path: '/login' });
  }, // 失败回调

});

WebIM.WebRTC = webrtc;
WebIM.EMedia = emedia;
export default WebIM;
