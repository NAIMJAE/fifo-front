import React from 'react';

const SkillIcon = ({ skill }) => {
  return (
    <img 
      src={`../images/skillIcon/${skill}.svg`} 
      alt={skill} 
      style={{ width: '30px', height: '30px' }} 
    />
  );
};

export default SkillIcon;
