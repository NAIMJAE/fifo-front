import React from 'react'

const PageingComponent = ( {cntList, changePage} ) => {

    /*  list 페이지에서 서버에서 받아온 PageResponesDTO랑 changePage 함수 받아오면 됨
    
        const changePage = (newPg) => {
            setPageable(prev => ({...prev, pg: newPg}));
        }
    */

    /** 페이징 버튼 생성 */ 
    const pages = [];
    if (cntList && cntList.total > 0) {
        for (let i = cntList.start; i <= cntList.end; i++) {
            const pageClass = i === cntList.pg ? 'btnOn' : '';
            pages.push(
                <button className={pageClass} onClick={() => changePage(i)}>{i}</button>
            );
        }
    }
    /** 다음 버튼 */
    const prev = [];
    if (cntList && cntList.prev) {
        prev.push(
            <button onClick={() => changePage(cntList.start - 1)}>이전</button>
        );
    }
    /** 이전 버튼 */
    const next = [];
    if (cntList && cntList.next) {
        next.push(
            <button onClick={() => changePage(cntList.end + 1)}>다음</button>
        );
    }

  return (
    <div className='paging'>
        {prev}
        {pages}
        {next}
    </div>
  )
}

export default PageingComponent