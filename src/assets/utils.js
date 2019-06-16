// console
const { log, dir } = console

const setClock = (timeout = 2) => {
  const time = Math.random() * timeout
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000, 'finish')
  })
}

const objectIsEmpty = (obj) => {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

const timeConverter = (timestamp) => {
  const a = new Date(timestamp)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const year = a.getFullYear()
  const month = months[a.getMonth()]
  const date = a.getDate()
  const hour = a.getHours()
  const min = a.getMinutes()
  const sec = a.getSeconds()
  const time = year + ' ' + month + ' ' + date + ' ' + hour + ':' + min + ':' + sec
  return time
}

export { log, dir, setClock, objectIsEmpty, timeConverter }
