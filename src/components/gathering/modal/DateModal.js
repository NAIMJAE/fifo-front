import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateModal = ({ setDate, date, handleModal }) => {
    const handleClickOutside = (event) => {
        // Modal 외부 클릭 시 handleModal 호출
        if (event.target.className === 'dataModalBox') {
            handleModal();
        }
    };

    return (
        <div className='dataModalBox' onClick={handleClickOutside}>
            <div className='dateModal' onClick={(e) => e.stopPropagation()}>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                />
            </div>
        </div>
    );
};

export default DateModal;
