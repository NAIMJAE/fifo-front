import React, { useState } from 'react';
import KanbanInfoModal from './modal/KanbanInfoModal';

const Kanban = () => {
    const [items, setItems] = useState({
        ready: [
            {
                id: "fifi0001",
                group: '디자인',
                title: '메인 페이지 디자인',
                content: [
                    { index: 0, type: 'check', cnt: '헤더 디자인', state: false },
                    { index: 1, type: 'text', cnt: '네이게이션, 검색, 로고' },
                    { index: 2, type: 'check', cnt: '푸터 디자인', state: false },
                ],
                members: [2, 5],
                start: '2024-08-01',
                end: '2024-08-07',
                select: false,
            },
            {
                id: "fifi0002",
                group: '서버',
                title: 'EC2 서버 구축',
                content: [
                    { index: 0, cnt: '서버 초기 설정', state: false },
                    { index: 1, cnt: '서버 DB 설정', state: false },
                ],
                members: [2],
                start: '2024-08-01',
                end: '2024-08-09',
                select: false,
            },
            {
                id: "fifi0003",
                group: '회원',
                title: '회원 가입',
                content: [
                    { index: 0, cnt: '회원 정보 입력', state: false },
                    { index: 1, cnt: '유효성 검사', state: false },
                ],
                members: [5],
                start: '2024-08-01',
                end: '2024-08-30',
                select: false,
            },
        ],
        doing: [],
        complete: [],
    });

    // 드래그 중인 요소의 정보를 저장하는 상태
    const [dragging, setDragging] = useState(null);

    // 드래그를 시작할 때 실행
    const handleDragStart = (task, fromColumn, event) => {
        setDragging({ task, fromColumn });
    };

    // 드래그 오버 시 실행
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 드롭 시 실행
    const handleDrop = (toColumn, toIndex) => {
        if (!dragging) return;

        const { task, fromColumn } = dragging;
        if (fromColumn === toColumn && toIndex === undefined) return;

        setItems((prevItems) => {
            const newItems = { ...prevItems };
            const fromList = newItems[fromColumn];
            const toList = newItems[toColumn];
            const fromIndex = fromList.findIndex(item => item.id === task.id);
            if (fromIndex === -1) return newItems;

            // 같은 컬럼 내에서 순서 변경
            if (fromColumn === toColumn) {
                const [removed] = fromList.splice(fromIndex, 1);
                toList.splice(toIndex, 0, removed);
            } else {
                // 다른 컬럼으로 이동
                const [removed] = fromList.splice(fromIndex, 1);
                toList.splice(toIndex !== undefined ? toIndex : toList.length, 0, removed);
            }

            return newItems;
        });

        setDragging(null);
    };

    // 아이템 상세 보기 모달
    const [itemInfoModal, setItemInfoModal] = useState(false);
    const [modalContent, setModalContent] = useState("")

    const itemModal = (item) => {
        setModalContent(item);
        setItemInfoModal(!itemInfoModal);
    }

    // 아이템 선택시 테두리
    const [selectedItemId, setSelectedItemId] = useState("");

    const selectedItem = (toColumn, id) => {

        setItems(prevItems => {
            const newItems = { ...prevItems };

            // 이전에 선택된 아이템의 select를 false로 변경
            if (selectedItemId) {
                Object.keys(newItems).forEach(column => {
                    newItems[column] = newItems[column].map(item => {
                        if (item.id === selectedItemId) {
                            return { ...item, select: false };
                        }
                        return item;
                    });
                });
            }

            // 현재 선택된 아이템의 select를 true로 변경
            newItems[toColumn] = newItems[toColumn].map(item => {
                if (item.id === id) {
                    return { ...item, select: true };
                }
                return item;
            });

            return newItems;
        });

        setSelectedItemId(id);
    }

    return (
        <div className="kanbanPage">
            <div className="kanban">
                {/* READY 컬럼 */}
                <div className="board">
                    <h1>READY</h1>
                    <div
                        className="itemBox"
                        onDragOver={handleDragOver}  // 컬럼에서도 onDragOver 처리 필요
                        onDrop={(e) => handleDrop('ready')}  // 컬럼에 onDrop 처리 필요
                    >
                        {items.ready.length > 0 && items.ready.map((item, index) => (
                            <div
                                key={item.id}
                                className={`item ${item.select ? 'selected' : ''}`}
                                draggable
                                onClick={() => selectedItem('ready', item.id)}
                                onDoubleClick={() => itemModal(item)}
                                onDragStart={(e) => handleDragStart(item, 'ready', e)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop('ready', index)}
                            >
                                <label>
                                    <h2>{item.group}</h2>
                                    <img src="../../../../images/ppoppi.png" alt="profile" />
                                </label>
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="add">+ Add</div>
                </div>

                {/* DOING 컬럼 */}
                <div className="board">
                    <h1>DOING</h1>
                    <div
                        className="itemBox"
                        onDragOver={handleDragOver}  // 컬럼에서도 onDragOver 처리 필요
                        onDrop={(e) => handleDrop('doing')}  // 컬럼에 onDrop 처리 필요
                    >
                        {items.doing.length > 0 && items.doing.map((item, index) => (
                            <div
                                key={item.id}
                                className={`item ${item.select ? 'selected' : ''}`}
                                draggable
                                onClick={() => selectedItem('doing', item.id)}
                                onDragStart={(e) => handleDragStart(item, 'doing', e)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop('doing', index)}
                            >
                                <label>
                                    <h2>{item.group}</h2>
                                    <img src="../../../../images/ppoppi.png" alt="profile" />
                                </label>
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="add">+ Add</div>
                </div>

                {/* COMPLETE 컬럼 */}
                <div className="board">
                    <h1>COMPLETE</h1>
                    <div
                        className="itemBox"
                        onDragOver={handleDragOver}  // 컬럼에서도 onDragOver 처리 필요
                        onDrop={(e) => handleDrop('complete')}  // 컬럼에 onDrop 처리 필요
                    >
                        {items.complete.length > 0 && items.complete.map((item, index) => (
                            <div
                                key={item.id}
                                className={`item ${item.select ? 'selected' : ''}`}
                                draggable
                                onClick={() => selectedItem('complete', item.id)}
                                onDragStart={(e) => handleDragStart(item, 'complete', e)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop('complete', index)}
                            >
                                <label>
                                    <h2>{item.group}</h2>
                                    <img src="../../../../images/ppoppi.png" alt="profile" />
                                </label>
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="add">+ Add</div>
                </div>
            </div>
            {itemInfoModal && <KanbanInfoModal modalContent={modalContent} itemModal={itemModal}/>}
        </div>
    );
};

export default Kanban;
