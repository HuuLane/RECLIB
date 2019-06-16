// console
const { log, dir } = console
// postData
const myFetch = async (method, url, data) => {
  // Default options are marked with *
  const options = {
    headers: {
      'content-type': 'application/json'
    },
    method,
    mode: 'cors'
  }
  if (method === 'POST') {
    options.body = JSON.stringify(data)
  }
  const response = await fetch(url, options)
  return response.json()
}

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

export { myFetch, log, dir, setClock, objectIsEmpty, timeConverter }
