import React from 'react'
import '../../../styles/footer.scss'

const Footer = () => {
  return (
    <footer>
        <div>
            <div id='footerInfo'>
                웹사이트 정보<br/>
                - 회사정보<br/>
                - 만든사람 등
            </div>
            <div id='footerTerms'>이용약관</div>
        </div>
    </footer>
  )
}

export default Footer