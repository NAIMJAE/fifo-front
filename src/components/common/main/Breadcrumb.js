import React from 'react'

const Breadcrumb = ({crumb}) => {

    /** 파라미터로 현재 페이지 위치 받아와서 띄우는 컴포넌트 */

  return (
    <div className='Breadcrumb'>
        <span></span>
        <p>{crumb}</p>
    </div>
  )
}

export default Breadcrumb