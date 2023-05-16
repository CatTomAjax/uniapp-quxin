const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDuring = date =>{
	var days = parseInt(date / (1000 * 60 * 60 * 24));
	var hours = parseInt((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = parseInt((date % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = ((date % (1000 * 60)) / 1000).toFixed(0);
	return (days > 0 ? days + '天' : '') + (hours > 0 ? hours + '小时' : '') + (minutes == 0 ? '1分钟' :  minutes + '分钟');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  formatTime: formatTime,
  formatDuring
}
