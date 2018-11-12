import React from 'react'

const Flagger = props => {
  if (props.status === 'success') {
    return (
      <div>
        <div className="ui info message">
          <i className="close icon" />
          <div className="header">
            Upload successful!
          </div>
          I haven't seen this image before...can you help me learn how to classify it?
        </div>
      </div>
      )
  } else if (props.status === 'failure') {
    return (
      <div>
        <div className="ui warning message">
          <i className="close icon" />
          <div className="header">
            Something went wrong!
          </div>
          This isn't the right type of file, or I've seen this one before.  Try uploading a different image.
        </div>
      </div>
    )
  } else if (props.status === 'trained') {
    return (
      <div>
        <div className="ui info message">
          <i className="close icon" />
          <div className="header">
            Training successful!
          </div>
          Thank you for training housesfaces!  Upload another image and keep going!
        </div>
      </div>
    )
  } else return <span />
}

export default Flagger
