import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootUrl } from '../../api/RootUrl';
import { getCurrentDateTime } from '../common/helper/ChangeDate';

const Chatting = ({ mooim }) => {

    const loginSlice = useSelector((state) => state.authSlice) || {};

    /** 채팅방 번호 */
    const roomId = "chatRoom"+mooim.mooimno;

    /** 불러온 메세지 */
    const [messages, setMessages] = useState([]);

    /** 입력한 메세지 */
    const [inputMsg, setInputMsg] = useState("");

    /** 소켓 연결 상태 */
    const webSocket = useRef(null);

    /** 웹 소켓 연결 */
    useEffect(() => {
        // WebSocket 서버에 연결
        webSocket.current = new WebSocket(`ws://localhost:8080/fifo-back/chat/${roomId}`);

        // 연결이 성립되었을 때 실행
        webSocket.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        // 메시지를 받았을 때 실행
        webSocket.current.onmessage = (message) => {
            const receivedMessage = JSON.parse(message.data);
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
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

    /** 메세지 전송 함수 */
    const sendMessage = () => {
        console.log(111);

        if (inputMsg && webSocket.current.readyState === WebSocket.OPEN) {

            const socketMsg = {
                mooimno: mooim.mooimno,
                nick: loginSlice.nick,
                message: inputMsg,
                chatdate: getCurrentDateTime(),
                thumb: loginSlice.thumb,
            }

            const saveMsg = {
                mooimno: mooim.mooimno,
                userno: loginSlice.userno,
                message: inputMsg,
                chatdate: getCurrentDateTime(),
                thumb: loginSlice.thumb,
            }

            console.log("과연? ",saveMsg)

            // 소켓으로 메세지 전송
            webSocket.current.send(JSON.stringify(socketMsg));
            setInputMsg('');

            // DB로 메세지 전송
            try {
                
            } catch (error) {
                console.log(error);
            }

        }
    };
    

    /** 엔터 키 감지 핸들러 */
    const keyDown = (e) => {
        if (e.key === "Enter") {
        sendMessage();
        }
    };

  return (
    <div className='chatting'>
        <div className='chatRoom'>
            <div className='chatSide'>

            </div>

            <div className='chatCnt'>
                <div className='chatMsg'>
                    
                    {messages.map((msg, index) => (
                        <div key={index} className='msg'>
                            <h1>{msg.nick}</h1>
                            <h2>{msg.message}</h2>
                            <h3>{msg.chatdate}</h3>
                        </div>
                    ))}
                </div>

                <div className='chatInput'>
                    <div>
                        <FontAwesomeIcon icon={faPlus} size="lg" color="#7b7b7b"/>
                        <input type="text" value={inputMsg} 
                            onChange={(e) => {setInputMsg(e.target.value)}}
                            onKeyDown={keyDown}
                            />

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chatting