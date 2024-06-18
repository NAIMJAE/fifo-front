import React from 'react';
import { Link } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';
import Chip from '@mui/material/Chip';
import { getSkillColor } from '../../utils/skillUtils';  // 수정된 경로

const GatherBoxComponent = ({ gathList }) => {
  const mockSkills = [
    { name: 'Java Lv5' },
    { name: 'Spring Lv3' },
    { name: 'JavaScript Lv1' },
    { name: 'React Lv4' }
  ];

  return (
    <>
      {gathList && gathList.dtolist.length > 0 ? (
        gathList.dtolist.map((gathering, index) => (
          <Link to="/" key={index}>
            <div>
              <span>{gathering.gathcate}</span>
            </div>

            <div className='imgBox'>
              {gathering.thumb && gathering.thumb.trim() ? (
                <img src={`${RootUrl()}/uploads/gathering/thumb/${gathering.thumb}`} alt="thumb" />
              ) : (
                <img src="../../images/sample/ppoppi_angry.png" alt="sample" />
              )}
            </div>

            <div className='cntColumn'>
              <h3>{gathering.nick}</h3>
              <h4>{gathering.gathtitle}</h4>
              <h5>모집기간 : {gathering.recruitstart} ~ {gathering.recruitend}</h5>

              {/** java Lv5, React Lv3 ... 문자열 잘라서 반복 출력 할 컴포넌트 */}
              <div className='gathSkillList'>
                {mockSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.name}
                    sx={{ backgroundColor: getSkillColor(skill.name.split(' ')[0]), color: 'white', marginRight: '5px', marginBottom: '5px' }}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <>
          {/** 데이터가 없을 때 */}
          <Link to="/">
            <div>
              <span>프로젝트</span>
            </div>

            <div className='imgBox'>
              <img src="../../images/sample/ppoppi_angry.png" alt="" />
            </div>

            <div className='cntColumn'>
              <h3>홍길동</h3>
              <h4>사이드 프로젝트 팀원 모집</h4>
              <h5>모집기간 : 24.06.02 ~ 24.06.16</h5>
              <div className='gathSkillList'>
                {mockSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.name}
                    sx={{ backgroundColor: getSkillColor(skill.name.split(' ')[0]), color: 'white', marginRight: '5px', marginBottom: '5px' }}
                  />
                ))}
              </div>
            </div>
          </Link>
          <Link to="/">
            <div>
              <span>프로젝트</span>
            </div>

            <div className='imgBox'>
              <img src="../../images/sample/sample2.jpg" alt="" />
            </div>

            <div className='cntColumn'>
              <h3>홍길동</h3>
              <h4>사이드 프로젝트 팀원 모집</h4>
              <h5>모집기간 : 24.06.02 ~ 24.06.16</h5>
              <div className='gathSkillList'>
                {mockSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.name}
                    sx={{ backgroundColor: getSkillColor(skill.name.split(' ')[0]), color: 'white', marginRight: '5px', marginBottom: '5px' }}
                  />
                ))}
              </div>
            </div>
          </Link>
          <Link to="/">
            <div>
              <span>프로젝트</span>
            </div>

            <div className='imgBox'>
              <img src="../../images/sample/ppoppi_angry.png" alt="" />
            </div>

            <div className='cntColumn'>
              <h3>홍길동</h3>
              <h4>사이드 프로젝트 팀원 모집</h4>
              <h5>모집기간 : 24.06.02 ~ 24.06.16</h5>
              <div className='gathSkillList'>
                {mockSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.name}
                    sx={{ backgroundColor: getSkillColor(skill.name.split(' ')[0]), color: 'white', marginRight: '5px', marginBottom: '5px' }}
                  />
                ))}
              </div>
            </div>
          </Link>
          <Link to="/">
            <div>
              <span>프로젝트</span>
            </div>

            <div className='imgBox'>
              <img src="../../images/sample/ppoppi_angry.png" alt="" />
            </div>

            <div className='cntColumn'>
              <h3>홍길동</h3>
              <h4>사이드 프로젝트 팀원 모집</h4>
              <h5>모집기간 : 24.06.02 ~ 24.06.16</h5>
              <div className='gathSkillList'>
                {mockSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.name}
                    sx={{ backgroundColor: getSkillColor(skill.name.split(' ')[0]), color: 'white', marginRight: '5px', marginBottom: '5px' }}
                  />
                ))}
              </div>
            </div>
          </Link>
          <Link to="/">
            <div>
              <span>프로젝트</span>
            </div>

            <div className='imgBox'>
              <img src="../../images/sample/ppoppi_angry.png" alt="" />
            </div>

            <div className='cntColumn'>
              <h3>홍길동</h3>
              <h4>사이드 프로젝트 팀원 모집</h4>
              <h5>모집기간 : 24.06.02 ~ 24.06.16</h5>
              <div className='gathSkillList'>
                {mockSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.name}
                    sx={{ backgroundColor: getSkillColor(skill.name.split(' ')[0]), color: 'white', marginRight: '5px', marginBottom: '5px' }}
                  />
                ))}
              </div>
            </div>
          </Link>
        </>
      )}
    </>
  );
}

export default GatherBoxComponent;
