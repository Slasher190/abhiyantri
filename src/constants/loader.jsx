import { LineWave } from 'react-loader-spinner'
import React from 'react'
export default function Loader() {
  return (
    <LineWave
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="line-wave"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      firstLineColor="#212f56"
      middleLineColor="#212f56"
      lastLineColor="#212f56"
    />
  )
}
