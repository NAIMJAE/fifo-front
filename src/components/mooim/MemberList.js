import React from 'react'
import { RootUrl } from '../../api/RootUrl'
import SkillIcon from '../gathering/SkillIcon'

const MemberList = ({ mooim }) => {
  return (
    <div className='memberList'>
        {mooim.memberList && mooim.memberList.map((member, index) => (
        <div className='member' key={index}>
            <img src={`${RootUrl()}/uploads/user/${member.usersDTO.thumb}`} alt="profile" />
            <div>
            <h1>{member.usersDTO.nick}</h1>
            <div className='skill'>
                {member.usersDTO.skillList && member.usersDTO.skillList.map((skill, skillIndex) => (
                <div key={skillIndex}>
                    <SkillIcon skill={skill.languagename} classType='skillImg' />
                    <span>{skill.languagename}</span>
                </div>
                ))}
            </div>
            </div>
            {mooim.userno === member.userno ? (<span className='badge'>팀장</span>) : null}
        </div>
        ))}
    </div>
  )
}

export default MemberList