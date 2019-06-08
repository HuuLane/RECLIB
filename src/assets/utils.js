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

export { myFetch, log, dir }
