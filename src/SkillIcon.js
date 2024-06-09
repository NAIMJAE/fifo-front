import React from 'react';

const SkillIcon = ({ skill }) => {
  return (
    <img 
      className='skillImg'
      src={`../images/skillIcon/${skill}.svg`} 
      alt={skill} 
    />
  );
};

export default SkillIcon;
