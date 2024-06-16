import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { getSkillColor } from '../../utils/skillUtils'; 

export default function SkillTags({ onChange }) {
  const [selectedSkills, setSelectedSkills] = React.useState([]);

  /** 선택된 스킬 저장 */
  const handleChange = (event, newValue) => {
    setSelectedSkills(newValue);
    const selectedLanguages = newValue.map(skill => skill.name).join(', ');
    onChange(selectedLanguages);
  };

  /** 같은 종류의 언어는 선택할 수 없게 필터링 */
  const isSkillSelected = (skill) => {
    const baseSkill = skill.split(' Lv')[0];
    return selectedSkills.some(selected => selected.name.includes(baseSkill));
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={skills.filter(skill => !isSkillSelected(skill.name))} // 이미 선택한 스킬이면 자동완성에서 없앰
        getOptionLabel={(option) => option.name}
        value={selectedSkills}
        onChange={handleChange}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="모집 언어"
            placeholder="원하는 언어와 Lv를 선택하세요."
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              sx={{ backgroundColor: getSkillColor(option.name), color: 'white' }}
            />
          ))
        }
      />
    </Stack>
  );
}

const baseSkills = [
  'JavaScript',
  'Java',
  'React',
  'HTML',
  'PHP',
  'Spring',
  'Flutter',
  'JQuery',
  'CSS',
];

// 언어 + Lv 붙여주기
const skills = baseSkills.flatMap(skill => 
  [1, 2, 3, 4, 5].map(level => ({ name: `${skill} Lv${level}` }))
);
