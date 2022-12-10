import React, { Component } from 'react'
import BounceLoader from "react-spinners/ClipLoader";
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <BounceLoader color="#36d7b7" />
      </div>
    )
  }
}

