import axios from 'axios'

export const getData = async (url, bearerToken) => {
  const data = ''
  try {
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    })
    console.log(typeof res?.data, 'hello this is data ')
    // data = ...res.data
  } catch (error) {
    console.log(error)
  }
  return data
}
