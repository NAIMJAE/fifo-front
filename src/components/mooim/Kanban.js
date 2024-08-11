import React, { useEffect, useRef, useState } from 'react';
import KanbanInfoModal from './modal/KanbanInfoModal';
import { Host, RootUrl } from '../../api/RootUrl';
import { insertItemApi, selectKanbanApi } from '../../api/KanbanApi';

const Kanban = ({ mooimno, memberList, updateProgress }) => {
    /** 칸반 데이터 관리 */
    const [items, setItems] = useState({
        ready: [],
        doing: [],
        complete: [],
    });

    /** kanNo 저장 */
    const [kanNo, setKanNo] = useState("");

    /** kaban 업데이트 상태 관리 */
    const [kanUpdate, setKanUpdate] = useState(false);

    /** 소켓 연결 상태 */
    const webSocket = useRef(null);
    /** 소켓방 번호 */
    const roomId = "kanban" + mooimno;

    /** 웹 소켓 연결 */
  useEffect(() => {
    // WebSocket 서버에 연결
    webSocket.current = new WebSocket(`ws://${Host}:8080/fifo-back/kan/${roomId}`);

    // 연결이 성립되었을 때 실행
    webSocket.current.onopen = () => {
        console.log('WebSocket connection established');
    };

    // 메시지를 받았을 때 실행
    webSocket.current.onmessage = (message) => {
        const socketData = JSON.parse(message.data);

        console.log("소켓으로 받음 : ", socketData);
        const data = JSON.parse(socketData.payload);
        console.log("소켓으로 받음2 : ", data);
        setItems(JSON.parse(data.content));
    };

    // 연결이 종료되었을 때 실행
    webSocket.current.onclose = () => {
        console.log('WebSocket connection closed');
    };

    // 오류가 발생했을 때 실행
    webSocket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // 컴포넌트 언마운트 시 WebSocket 닫기
    return () => {
        if (webSocket.current) {
            webSocket.current.close();
        }
    };
  }, []);

    /** 페이지 로드시 데이터 조회 */
    useEffect(() => {
        const selectKanban = async () => {
            try {
                const response = await selectKanbanApi(mooimno);
                setKanNo(response.kanno);
                const data = JSON.parse(response.content);
                setItems(data);

            } catch (error) {
                console.log(error);
            }
        }
        selectKanban();
    },[]);

    /** 칸반 상태 변경시 적용 */
    useEffect(() => {
        const total = items["ready"].length + items["doing"].length + items["complete"].length;
        const progress = Math.floor(items["complete"].length * 100 / total);

        const updatedItem = async () => {
            if (kanUpdate) {
                const data = {
                    kanno: kanNo,
                    mooimno: mooimno,
                    content: JSON.stringify(items),
                    progress: progress,
                }
                try {
                    const response = await insertItemApi(data);
                    if (response > 0) {
                        webSocket.current.send(JSON.stringify(data));
                    }
                    setKanUpdate(false);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        updatedItem();
        updateProgress(progress);
    }, [items])

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
                removed.state = toColumn;
                toList.splice(toIndex !== undefined ? toIndex : toList.length, 0, removed);
            }

            return newItems;
        });
        setKanUpdate(true);
        setDragging(null);
    };

    // 아이템 상세 보기 모달
    const [itemInfoModal, setItemInfoModal] = useState(false);
    const [modalContent, setModalContent] = useState("")

    const itemModal = (item) => {
        setModalContent(item);
        setItemInfoModal(!itemInfoModal);
    }

    /** 아이템 선택시 테두리 */
    const [selectedItemId, setSelectedItemId] = useState("");

    /** 랜덤 아이디 생성 */
    const makeRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
    }

    /** 새로운 item 생성 */
    const [newItem, setNewItem] = useState({
        board: '',
        state: false,
        title: '',
        group: '',
    });

    /** 아이템 제목 입력 */
    const inputItemTitle = (e) => {
        setNewItem({ ...newItem, title: e.target.value });
    };

    /** 아이템 그룹 입력 */
    const inputItemGroup = (e) => {
        setNewItem({ ...newItem, group: e.target.value });
    };

    /** 새로운 아이템 생성 */
    const addNewItem = async (state) => {
        const newItemData = {
            id: makeRandomId(),
            state: state,
            group: newItem.group,
            title: newItem.title,
            content: [],
            members: [],
        };

        setItems((prevItems) => {
            return {
                ...prevItems,
                [state]: [...prevItems[state], newItemData],
            };
        });

        setKanUpdate(true);

        setNewItem({
            state: false,
            title: '',
            group: '',
        });
    }

    /** 아이템 관리 */
    const [itemWork, setItemWork] = useState("");

    /** 아이템 관리 버튼 클릭 */
    const clickEtc = (id) => {
        if (itemWork !== id) {
            setItemWork(id);
        }else {
            setItemWork("")
        }
    }

    /** 아이템 삭제 */
    const deleteItem = () => {
        setItems((prevItems) => {
            const newItems = { ...prevItems };
    
            ["ready", "doing", "complete"].forEach((state) => {
                newItems[state] = newItems[state].filter(item => item.id !== itemWork);
            });
    
            return newItems;
        });
    
        setKanUpdate(true);
        setItemWork("");
    }

    /** 칸반 모달에서 내용 변경시 수정 사항 저장하는 함수 */
    const modifyItem = (data) => {
        setItems((prevItems) => {
            const newItems = { ...prevItems };

            const state = data.state;
            const updated = newItems[state].map(item => {
                // id가 같은 항목을 찾아서 덮어쓰기
                if (item.id === data.id) {
                    return {
                        ...item,
                        ...data
                    };
                }
                return item;
            });
            newItems[state] = updated;
    
            return newItems;
        });
        setKanUpdate(true);
    }


    return (
        <div className="kanbanPage">
            <div className="kanban">
                {/* READY 컬럼 */}
                <div className="board">
                    <h1>READY</h1>
                    <div
                        className="itemBox"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop('ready')}
                    >
                        {items.ready.length > 0 && items.ready.map((item, index) => (
                            <div
                                key={item.id}
                                className={`item ${item.id === selectedItemId ? 'selected' : ''}`}
                                draggable
                                onClick={() => setSelectedItemId(item.id)}
                                onDoubleClick={() => itemModal(item)}
                                onDragStart={(e) => handleDragStart(item, 'ready', e)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop('ready', index)}
                            >
                                <div>
                                    <h2>{item.group}</h2>
                                    <div>
                                    {memberList.map((member, index) => (
                                        <div key={index}>
                                        {item.members.includes(member.usersDTO.userno) && 
                                            <img key={index} src={`${RootUrl()}/uploads/user/${member.usersDTO.thumb}`} alt="profile" />
                                        }
                                        </div>
                                    ))}
                                        <div className='etc' onClick={() => clickEtc(item.id)}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                {itemWork === item.id && 
                                    <label className='work'>
                                        <h1 onClick={deleteItem}>삭제</h1>
                                    </label>
                                }
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>

                    {!newItem.state && <div className="add" onClick={() => setNewItem({ ...newItem, state: true, board:"ready" })}>+ Add</div>}
                    {newItem.state && <div className="add" onClick={() => setNewItem({ ...newItem, state: false, board:"" })}>+ Add</div>}
                    
                    {newItem.state && newItem.board === "ready" &&
                        <div className='addItem'>
                            <input type="text" value={newItem.title} onChange={inputItemTitle} placeholder='Title'/>
                            <div>
                                <input type="text" value={newItem.group} onChange={inputItemGroup} placeholder='Group'/>
                                <button onClick={() => addNewItem("ready")}>생성</button>
                            </div>
                        </div>
                    }
                </div>

                {/* DOING 컬럼 */}
                <div className="board">
                    <h1>DOING</h1>
                    <div
                        className="itemBox"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop('doing')}
                    >
                        {items.doing.length > 0 && items.doing.map((item, index) => (
                            <div
                                key={item.id}
                                className={`item ${item.id === selectedItemId ? 'selected' : ''}`}
                                draggable
                                onClick={() => setSelectedItemId(item.id)}
                                onDoubleClick={() => itemModal(item)}
                                onDragStart={(e) => handleDragStart(item, 'doing', e)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop('doing', index)}
                            >
                                <div>
                                    <h2>{item.group}</h2>
                                    <div>
                                    {memberList.map((member, index) => (
                                        <div key={index}>
                                        {item.members.includes(member.usersDTO.userno) && 
                                            <img key={index} src={`${RootUrl()}/uploads/user/${member.usersDTO.thumb}`} alt="profile" />
                                        }
                                        </div>
                                    ))}
                                        <div className='etc' onClick={() => clickEtc(item.id)}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                {itemWork === item.id && 
                                    <label className='work'>
                                        <h1 onClick={deleteItem}>삭제</h1>
                                    </label>
                                }
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>
                    {!newItem.state && <div className="add" onClick={() => setNewItem({ ...newItem, state: true, board:"doing" })}>+ Add</div>}
                    {newItem.state && <div className="add" onClick={() => setNewItem({ ...newItem, state: false, board:"" })}>+ Add</div>}
                    
                    {newItem.state && newItem.board === "doing" &&
                        <div className='addItem'>
                            <input type="text" value={newItem.title} onChange={inputItemTitle} placeholder='Title'/>
                            <div>
                                <input type="text" value={newItem.group} onChange={inputItemGroup} placeholder='Group'/>
                                <button onClick={() => addNewItem("doing")}>save</button>
                            </div>
                        </div>
                    }
                </div>

                {/* COMPLETE 컬럼 */}
                <div className="board">
                    <h1>COMPLETE</h1>
                    <div
                        className="itemBox"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop('complete')}
                    >
                        {items.complete.length > 0 && items.complete.map((item, index) => (
                            <div
                                key={item.id}
                                className={`item ${item.id === selectedItemId ? 'selected' : ''}`}
                                draggable
                                onClick={() => setSelectedItemId(item.id)}
                                onDoubleClick={() => itemModal(item)}
                                onDragStart={(e) => handleDragStart(item, 'complete', e)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop('complete', index)}
                            >
                                <div>
                                    <h2>{item.group}</h2>
                                    <div>
                                    {memberList.map((member, index) => (
                                        <div key={index}>
                                        {item.members.includes(member.usersDTO.userno) && 
                                            <img key={index} src={`${RootUrl()}/uploads/user/${member.usersDTO.thumb}`} alt="profile" />
                                        }
                                        </div>
                                    ))}
                                        <div className='etc' onClick={() => clickEtc(item.id)}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                {itemWork === item.id && 
                                    <label className='work'>
                                        <h1 onClick={deleteItem}>삭제</h1>
                                    </label>
                                }
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>

                    {!newItem.state && <div className="add" onClick={() => setNewItem({ ...newItem, state: true, board:"complete" })}>+ Add</div>}
                    {newItem.state && <div className="add" onClick={() => setNewItem({ ...newItem, state: false, board:"" })}>+ Add</div>}

                    {newItem.state && newItem.board === "complete" &&
                        <div className='addItem'>
                            <input type="text" value={newItem.title} onChange={inputItemTitle} placeholder='Title'/>
                            <div>
                                <input type="text" value={newItem.group} onChange={inputItemGroup} placeholder='Group'/>
                                <button onClick={() => addNewItem("complete")}>save</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {itemInfoModal && 
                <KanbanInfoModal 
                    modalContent={modalContent} 
                    setModalContent={setModalContent} 
                    itemModal={itemModal} 
                    makeRandomId={makeRandomId}
                    memberList={memberList}
                    modifyItem={modifyItem}
                />}
        </div>
    );
};

export default Kanban;
