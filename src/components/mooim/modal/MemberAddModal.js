import { RootUrl } from '../../../api/RootUrl'

const MemberAddModal = ({ memberList, localContent, modifyItem, setLocalContent }) => {

    const memberCheck = (e, userno) => {
        const { checked } = e.target;
        let newMembers;

        if (checked) {
            newMembers = [...localContent.members, userno];
        } else {
            newMembers = localContent.members.filter(member => member !== userno);
        }

        const updatedContent = {
            ...localContent,
            members: newMembers,
        };

        setLocalContent(updatedContent);

        // 상태가 업데이트된 후 modifyItem을 호출하여 최신 상태를 서버에 전달
        modifyItem(updatedContent);
    };

  return (
    <div className='MemberAddModalBox'>
        <div className='memberBox'>
            {memberList.map((member, index) => (
                <div className='member' key={member.usersDTO.userno}>
                    <input
                        type="checkbox"
                        checked={localContent.members.includes(member.usersDTO.userno)}
                        onChange={(e) => memberCheck(e, member.usersDTO.userno)}
                    />
                    <img src={`${RootUrl()}/uploads/user/${member.usersDTO.thumb}`} alt="profile" />
                    <h2>{member.usersDTO.nick}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MemberAddModal