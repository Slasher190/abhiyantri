import axios from 'axios'

export const getData = async (url, bearerToken) => {
  try {
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    })
    console.log(typeof res?.data, 'hello this is data ')
    return res?.data
    // data = ...res.data
  } catch (error) {
    console.log(error)
    return error
  }
}
