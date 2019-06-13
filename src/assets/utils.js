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

export { myFetch, log, dir, setClock, objectIsEmpty }
