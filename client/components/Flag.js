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
            I've already seen this one!
          </div>
          Hopefully I did alright!  Try uploading another image.
        </div>
      </div>
    )
  } else return <span />
}

export default Flagger
