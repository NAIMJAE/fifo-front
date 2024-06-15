import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Box,
  Typography,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import SkillIcon from '../../SkillIcon';
import '../../styles/gathering.scss';

const languagesList = [
  { name: 'JavaScript' },
  { name: 'Java' },
  { name: 'React' },
  { name: 'HTML' },
  { name: 'PHP' },
  { name: 'Spring' },
  { name: 'Flutter' },
  { name: 'JQuery' },
  { name: 'CSS' },
];

const levels = ['Lv1', 'Lv2', 'Lv3', 'Lv4', 'Lv5'];

export default function SearchAside() {
  const [meetingType, setMeetingType] = useState('study');
  const [meetingMethod, setMeetingMethod] = useState('online');
  const [members, setMembers] = useState('');
  const [position, setPosition] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [tagList, setTagList] = useState([]);

  /** 검색 카테고리 선택할 때 마다 태그에 추가 */
  useEffect(() => {
    const newTags = [];
    if (meetingType) newTags.push(`모집 유형: ${meetingType}`);
    if (meetingMethod) newTags.push(`모집 방식: ${meetingMethod}`);
    if (members) newTags.push(`모집 인원: ${members}명`);
    if (position) newTags.push(`모집 포지션: ${position}`);
    languages.forEach(language => newTags.push(`모집 언어: ${language}`));
    if (selectedLanguage && selectedLevel) newTags.push(`기술 스택: ${selectedLanguage} ${selectedLevel}`);
    setTagList(newTags);
  }, [meetingType, meetingMethod, members, position, languages, selectedLanguage, selectedLevel]);

  /** 언어 선택 */
  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setSelectedLevel(null);
  };
/** 레벨 선택 */
  const selectLevel = (level) => {
    setSelectedLevel(level);
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>검색 필터</Typography>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">모집 유형</FormLabel>
        <Box className='meetingType'>
          <button className={meetingType === 'project' ? 'active' : ''} onClick={() => setMeetingType('project')}>
            프로젝트
          </button>
          <button className={meetingType === 'study' ? 'active' : ''} onClick={() => setMeetingType('study')}>
            스터디
          </button>
          <button className={meetingType === 'meeting' ? 'active' : ''} onClick={() => setMeetingType('meeting')}>
            모임
          </button>
        </Box>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">모집 방식</FormLabel>
        <Box className='meetingMethod'>
          <button className={meetingMethod === 'online_offline' ? 'active' : ''} onClick={() => setMeetingMethod('online_offline')}>
            온/오프라인
          </button>
          <button className={meetingMethod === 'online' ? 'active' : ''} onClick={() => setMeetingMethod('online')}>
            온라인
          </button>
          <button className={meetingMethod === 'offline' ? 'active' : ''} onClick={() => setMeetingMethod('offline')}>
            오프라인
          </button>
        </Box>
      </FormControl>

      <FormControl sx={{ mt: 2, width: '100%' }}>
        <InputLabel id="members-label">모집 인원</InputLabel>
        <Select
          labelId="members-label"
          id="members"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          input={<OutlinedInput label="모집 인원" />}
        >
          <MenuItem value="2">2명</MenuItem>
          <MenuItem value="3">3명</MenuItem>
          <MenuItem value="4">4명</MenuItem>
          <MenuItem value="5">5명</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mt: 2, width: '100%' }}>
        <InputLabel id="position-label">모집 포지션</InputLabel>
        <Select
          labelId="position-label"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          input={<OutlinedInput label="모집 포지션" />}
        >
          <MenuItem value="백앤드">백앤드</MenuItem>
          <MenuItem value="프론트앤드">프론트앤드</MenuItem>
          <MenuItem value="디자이너">디자이너</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>기술 스택</Typography>
      <Box className="tech-stack">
        <ul className='languages'>
          {languagesList.map((language) => (
            <li
              key={language.name}
              className={`languageIcon ${selectedLanguage === language.name ? 'selectedLanguage' : ''}`}
              onClick={() => selectLanguage(language.name)}
            >
              <SkillIcon skill={language.name} />
              <span className='languageName'>{language.name}</span>
            </li>
          ))}
        </ul>
      </Box>

      {selectedLanguage && (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>레벨 선택</Typography>
          <div className='levels'>
            {levels.map((level) => (
              <button
                key={level}
                className={`levelButton ${selectedLevel === level ? 'selectedLevel' : ''}`}
                onClick={() => selectLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" fullWidth>적용</Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>선택된 태그</Typography>
        <div className='tagList'>
          {tagList.map((tag, index) => (
            <span key={index} className='tag'>#{tag}</span>
          ))}
        </div>
      </Box>
    </Box>
  );
}