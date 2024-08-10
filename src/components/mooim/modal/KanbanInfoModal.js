import React, { useState, useEffect } from 'react';
import { RootUrl } from '../../../api/RootUrl';
import MemberAddModal from './MemberAddModal';

const KanbanInfoModal = ({ modalContent, setModalContent, itemModal, makeRandomId, memberList, modifyItem }) => {
    // 로컬 상태로 modalContent 복사
    const [localContent, setLocalContent] = useState({ ...modalContent });

    // modalContent prop이 변경될 때 로컬 상태를 업데이트
    useEffect(() => {
        setLocalContent({ ...modalContent });
    }, [modalContent]);

    /** 칸반 제목 edit 활성화 */
    const [titleEditState, setTitleEditState] = useState(false);

    const titleEdit = () => {
        setTitleEditState(true);
    }

    const titleSave = () => {
        modifyItem(localContent);
        setTitleEditState(false);
    }

    const changeGroup = (e) => {
        setLocalContent({
            ...localContent,
            group: e.target.value,
        });
    }

    const changeTitle = (e) => {
        setLocalContent({
            ...localContent,
            title: e.target.value,
        });
    }

    /** 칸반 내용 edit 활성화 */
    const [itemEditState, setItemEditState] = useState(false);

    const itemEdit = () => {
        setItemEditState(true);
    }

    const itemSave = async () => {
        modifyItem(localContent);
        setItemEditState(false);
    }

    const addItem = () => {
        const newContent = {
            id: makeRandomId(), 
            type: 'check', 
            cnt: '', 
            state: false
        }

        setLocalContent({
            ...localContent,
            content: [...localContent.content, newContent],
        });
    }

    const deleteItem = (cont) => {
        const newContent = localContent.content.filter((item) => item.id !== cont.id);

        setLocalContent({
            ...localContent,
            content: newContent,
        });
    }

    const inputItem = (e, cont) => {
        const newContent = localContent.content.map((item) => {
            if (item.id === cont.id) {
                return {
                    ...item,
                    cnt: e.target.value,
                };
            }
            return item;
        });
    
        setLocalContent({
            ...localContent,
            content: newContent,
        });
    }

    /** 아이템 내용 체크 상태 관리 */
    const [checkState, setCheckState] = useState(false);

    /** 아이템 내용 체크 전송 */
    useEffect(() => {
        if (checkState) {
            modifyItem(localContent);
            setCheckState(false);
        }
    }, [localContent]);

    /** 아이템 내용 체크 */
    const inputCheck = (e, cont) => {
        const { checked } = e.target;
        const newContent = localContent.content.map((item) => {
            if (item.id === cont.id) {
                return {
                    ...item,
                    state: checked,
                };
            }
            return item;
        });
    
        setLocalContent({
            ...localContent,
            content: newContent,
        });
        setCheckState(true);
    }

    /** 칸반 작업 멤버 관리 함수 */
    const [addModal, setAddModal] = useState(false);

    /** 버블링 막는 함수 */
    function bubblingBlock(event) {
        event.stopPropagation();
    }

    return (
        <div className='KanbanInfoModalBox' onClick={itemModal}>
            <div className='KanbanInfoModal' onClick={bubblingBlock}>
                <div className='infoHead'>
                    <div className='infoTitle'>
                        {!titleEditState && 
                            <h1>[{localContent.group}] {localContent.title}</h1>
                        }
                        {titleEditState && 
                            <div>
                                <input type='text' value={localContent.group} onChange={(e) => changeGroup(e)} />
                                <input type='text' value={localContent.title} onChange={(e) => changeTitle(e)}/>
                            </div>
                        }
                        {!titleEditState && <button onClick={titleEdit}>수정</button>}
                        {titleEditState && <button onClick={titleSave}>저장</button>}
                    </div>
                    <div className='infoState'>
                        {localContent.state === "ready" && <span className='ready'>READY</span>}
                        {localContent.state === "doing" && <span className='doing'>DOING</span>}
                        {localContent.state === "complete" && <span className='complete'>COMPLETE</span>}
                        <div>
                            {memberList.map((member, index) => (
                                <>
                                {localContent.members.includes(member.usersDTO.userno) && 
                                    <div className='member' key={index}>
                                        <img src={`${RootUrl()}/uploads/user/${member.usersDTO.thumb}`} alt="profile" />
                                        <h2>{member.usersDTO.nick}</h2>
                                    </div>
                                }
                                </>
                            ))}
                        </div>
                        {titleEditState && !addModal && <button onClick={() => setAddModal(!addModal)}>추가</button>}
                        {titleEditState && addModal && <button onClick={() => setAddModal(!addModal)}>닫기</button>}
                        
                        {addModal && 
                            <MemberAddModal 
                                memberList={memberList} localContent={localContent}
                                modifyItem={modifyItem} setLocalContent={setLocalContent}
                            />
                        }
                    </div>
                </div>

                <div className='infoBody'>
                    <div className='bodyCnt'>
                        <div className='cntHead'>
                            <h1>Content</h1>
                            <div>
                                {itemEditState && <button onClick={addItem}>+</button>}
                                {!itemEditState && <button onClick={itemEdit}>수정</button>}
                                {itemEditState && <button onClick={itemSave}>저장</button>}
                            </div>
                        </div>

                        {!itemEditState && localContent.content.length > 0 && localContent.content.map((cont, index) => (
                            <>
                            {cont.type === 'check' && 
                                <div className='checkBox' key={index}>
                                    <input type="checkbox" checked={cont.state} onChange={(e) => inputCheck(e, cont)}/>
                                    <input type="text" value={cont.cnt} readOnly/>
                                </div>
                            }
                            </>
                        ))}

                        {itemEditState && localContent.content.length > 0 && localContent.content.map((cont, index) => (
                            <>
                            {cont.type === 'check' && 
                                <div className='editCheckBox' key={index}>
                                    <input type="checkbox" />
                                    <input type="text" value={cont.cnt} onChange={(e) => inputItem(e, cont)} />
                                    <button onClick={() => deleteItem(cont)}>X</button>
                                </div>
                            }
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KanbanInfoModal;
