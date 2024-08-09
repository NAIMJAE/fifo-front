import React from 'react'

const KanbanInfoModal = ({ modalContent, itemModal }) => {

    /** 버블링 막는 함수 */
    function bubblingBlock(event) {
        event.stopPropagation();
    }

  return (
    <div className='KanbanInfoModalBox' onClick={itemModal}>
        <div className='KanbanInfoModal' onClick={bubblingBlock}>
            <div className='infoHead'>
                <div className='infoTitle'>
                    <h1>[{modalContent.group}]</h1>
                    <h2>{modalContent.title}</h2>
                </div>
                <div className='infoState'>
                    <span>READY</span>
                    <div>
                        {modalContent.members.length > 0 && modalContent.members.map((mem, index) => (
                            <span key={index}>{mem}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className='infoBody'>
                <div className='bodyCnt'>
                    <div className='cntHead'>
                        <h1>Content</h1>
                        <button>edit</button>
                    </div>
                    {modalContent.content.length > 0 && modalContent.content.map((cont, index) => (
                        <>
                        {cont.type === 'check' && 
                            <div className='checkBox'>
                                <input type="checkbox" />
                                <input type="text" value={cont.cnt}/>
                            </div>
                        }
                        {cont.type === 'text' && 
                            <div className='textBox'>
                                <h1>-</h1>
                                <input type="text" value={cont.cnt}/>
                            </div>
                        }
                        </>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default KanbanInfoModal