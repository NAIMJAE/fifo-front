import React from 'react';
import { Link } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';
import Chip from '@mui/material/Chip';
import { getSkillColor } from '../../utils/skillUtils';

const GatherBoxComponent = ({ gathList }) => {
  const mockSkills = [
    { name: 'Java Lv5' },
    { name: 'Spring Lv3' },
    { name: 'JavaScript Lv1' },
    { name: 'React Lv4' }
  ];

  const getCategoryName = (gathcate) => {
    switch (gathcate) {
      case 1:
        return '프로젝트';
      case 2:
        return '스터디';
      case 3:
        return '모임';
    }
  };

  return (
    <>
      {gathList && gathList.length > 0 ? (
        gathList.map((gathering, index) => (
          <Link to={`/gathering/view?gathno=${gathering.gathno}`} key={index}>
            <div>
              <span>{getCategoryName(gathering.gathcate)}</span>
            </div>

            <div className='imgBox'>
              {gathering.thumb && gathering.thumb.trim() ? (
                <img src={`${RootUrl()}/uploads/gathering/thumb/${gathering.thumb}`} alt="thumb" />
              ) : (
                <img src="../../images/sample/ppoppi_angry.png" alt="sample" />
              )}
            </div>

            <div className='cntColumn'>
              <h3>{gathering.usernick}</h3>
              <h4>{gathering.gathtitle}</h4>
              <h5>모집기간 : {gathering.recruitstart} ~ {gathering.recruitend}</h5>

              {/** gathlanguage 문자열을 분리하여 Chip 컴포넌트로 표시 */}
              <div className="gathSkillList">
                {gathering.gathlanguage.split(', ').map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{ backgroundColor: getSkillColor(skill.split(' ')[0]), color: 'white', marginRight: '5px', marginBottom: '5px' }}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <>
          <div className='ctnRow'>
            {/** 데이터가 없을 때 */}
            <img src="../../images/sample/nodata.png" alt="" style={{ width: '100%' }} />
          </div>
        </>
      )}
    </>
  );
}

export default GatherBoxComponent;
