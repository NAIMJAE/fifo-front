import React, { useState } from 'react'

const Kanban = () => {
    const [items, setItems] = useState(
        {
            ready: [
                {
                    index: 0,
                    group: '디자인',
                    title: '메인 페이지 디자인',
                    content: [
                        {
                            index: 0,
                            cnt: '헤더 디자인',
                            state: false,
                        },
                        {
                            index: 1,
                            cnt: '푸터 디자인',
                            state: false,
                        },
                    ],
                    members: [2, 5],
                    start: '2024-08-01',
                    end: '2024-08-07',
                }
            ],
            doing: [

            ],
            complete: [
                
            ]
        }
    );
    const [draggingIndex, setDraggingIndex] = useState(null);

    // 드래그를 시작할때 실행
    const handleDragStart = (index) => {
        setDraggingIndex(index);
    };

    // 드래그를 통해 현재 요소가 다른 요소 위에 올라 갔을때 실행
    const handleDragOver = (index) => {
        if (index !== draggingIndex) {
            // 기존의 콘텐츠 배열 요소를 복사
            const updatedItems = [...items];

            // 현재 이동 중인 요소를 복사한 배열에서 삭제
            const draggedItem = updatedItems.splice(draggingIndex, 1)[0];

            // 새롭게 이동한 위치에 이동한 요소를 삽입
            updatedItems.splice(index, 0, draggedItem);

            // 드래그 중인 요소의 위치가 계속 변하게 되므로 위치 업데이트
            setDraggingIndex(index);

            // 바뀐 배열 요소를 기존의 배열에 업데이트
            setItems(updatedItems);
        }
    };

    // 드롭시 실행
    const handleDrop = () => {
        setDraggingIndex(null);
    };

    return (
        <div className='kanbanPage'>
            <div className='kanban'>
                <div className='board'>
                    <h1>READY</h1>

                    <div className='itemBox'>
                        <div className='item' draggable>
                            <label htmlFor="">
                                <h2>분류</h2>
                                <img src="../../../../images/ppoppi.png" alt="profile" />
                            </label>
                            <h3>제목</h3>
                        </div>
                        
                        <div className='item' draggable>
                            <label htmlFor="">
                                <h2>분류</h2>
                                <img src="../../../../images/ppoppi.png" alt="profile" />
                            </label>
                            <h3>제목</h3>
                        </div>
                    </div>

                    <div className='add'>+ Add</div>
                </div>

                <div className='board'>
                    <h1>DOING</h1>

                    <div className='itemBox'>

                    </div>

                    <div className='add'>+ Add</div>
                </div>

                <div className='board'>
                    <h1>COMPLETE</h1>

                    <div className='itemBox'>
                        
                    </div>

                    <div className='add'>+ Add</div>
                </div>
            </div>
        </div>
    );
};

export default Kanban