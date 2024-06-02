import React from 'react'

const Main = ({children}) => {
  return (
    <main>
        <div id='contentArea'>
            {children}
        </div>
    </main>
  )
}

export default Main