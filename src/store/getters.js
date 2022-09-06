const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  x_token: state => state.login.x_token,
  avatar: state => state.login.avatar,
  name: state => state.login.name,
  // 获取属性的状态
  config: state => state.config,

  loading: state => state.loading,

  loginstatic: state => state.loginstatic,
  userLoginInfo: state => state.userLoginInfo,
  userInfo: state => state.userInfo,
  showCitySelectBox: state => state.showCitySelectBox,
  evalDetailId: state => state.evalDetailId,
  pageTitle: state => state.pageTitle,
}
export default getters
