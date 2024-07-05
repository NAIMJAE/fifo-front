import React from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateModal = ({ setDate, date, handleModal }) => {
    return (
        <div className='dataModalBox' onClick={handleModal}>
            <div className='dateModal'>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                />
            </div>
        </div>
    )
}

export default DateModal