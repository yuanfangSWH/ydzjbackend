let myDate= "",
year= "", //获取年
month= "", //获取月，默认从0开始，所以要加一
date= "", //获取日
hours= "", //获取小时
minutes= "", //获取分
seconds= "", //获取秒
weekend= "", //获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
weeks= [],
day= "" //这样就是显示的星期x了

function changeTime(){
  (myDate = new Date()),
    (year = myDate.getFullYear()), //获取年
    (month = myDate.getMonth() + 1), //获取月，默认从0开始，所以要加一
    (date = myDate.getDate()), //获取日
    (hours = myDate.getHours()), //获取小时
    (minutes = myDate.getMinutes()), //获取分
    (seconds = myDate.getSeconds()), //获取秒
    (weekend = myDate.getDay()), //获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
    (weeks = new Array(
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    )),
    (day = weeks[weekend]); //这样就是显示的星期x了
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let str = year+'-'+month+'-'+date
  return str
}

export default changeTime;