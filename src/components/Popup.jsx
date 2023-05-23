import React from 'react'

const Popup = (prop) => {
  return (
    <div className='popup'>

        <div  className='closebtn-wrap'>
            
         <button className='closebtn' onClick={()=>{prop.setClose(false)}}>X</button>
        
        </div>

        <h3>Your Score is</h3>

        <div>

              <p>Accuracy : <spam> {prop.Accuracy } %</spam> </p>
              <p>Speed : <spam>{prop.Speed} WPM</spam> </p>

              
        </div>
    </div>
  )
}

export default Popup