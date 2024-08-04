import React from 'react'

const GifModal = ({ inputGif }) => {

    const gifList = [
        {
            thumb : "ppoppi_question.png",
            gif : "ppoppi_question.gif",
        },
        {
            thumb : "ppoppi_question.png",
            gif : "ppoppi_question.gif",
        },
        {
            thumb : "ppoppi_question.png",
            gif : "ppoppi_question.gif",
        },
        {
            thumb : "ppoppi_question.png",
            gif : "ppoppi_question.gif",
        },
    ]

  return (
    <div className='GifModal'>
        {gifList && gifList.map((gif, index) => (
            <img key={index} src={`../../../../images/mooim/chat/${gif.thumb}`} alt="gif"
                onClick={() => inputGif(gif.gif)}/>
        ))}
    </div>
  )
}

export default GifModal