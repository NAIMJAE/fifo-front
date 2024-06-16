// utils/skillUtils.js

export const skillColors = {
    'JavaScript': '#F7DF1E',
    'Java': '#007396',
    'React': '#61DAFB',
    'HTML': '#E34F26',
    'PHP': '#4F5B93',
    'Spring': '#6DB33F',
    'Flutter': '#02569B',
    'JQuery': '#0769AD',
    'CSS': '#1572B6',
  };
  
  export const getSkillColor = (skillName) => {
    const baseSkill = skillName.split(' Lv')[0];
    return skillColors[baseSkill] || '#4169e1';
  };
  