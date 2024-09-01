import React from 'react'
import '../../../styles/footer.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <div>
            <div id='footerInfo'>
                <ul>
                  <li></li>
                  <li>Copyright FIFO. All rights reserved.</li>
                  <li>Version 1.0.1-beta</li>
                </ul>
            </div>
            <div id='footerTerms'>
              <ul>
                <li><Link to="/">이용약관</Link></li>
                <li><Link to="/">개인정보처리방침</Link></li>
                <li><Link to="/">서비스소개</Link></li>
              </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer