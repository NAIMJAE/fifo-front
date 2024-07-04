import React from 'react'
import Header from '../components/common/main/Header'
import Footer from '../components/common/main/Footer'
import Main from '../components/common/main/Main'

const MainLayout = ({children}) => {
  /** 리랜더링 */
  return (
    <div id='container'>
        <Header></Header>
        <Main>
        {children}
        </Main>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout