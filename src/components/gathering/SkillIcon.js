import React from 'react';

const SkillIcon = ({ skill, classType }) => {
  return (
    <>
    {classType==='skillImg' ? (
      <img 
        className='skillImg'
        src={`../images/skillIcon/${skill}.svg`} 
        alt={skill} 
      />
    ) : (
      <img 
        className='bigSkillImg'
        src={`../images/skillIcon/${skill}.svg`} 
        alt={skill} 
      />
    )}
    </>
  );
};

export default SkillIcon;
