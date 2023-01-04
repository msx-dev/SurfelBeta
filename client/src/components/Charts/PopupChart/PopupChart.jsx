import React from 'react';
import "./PopupChart.css";
import ClickAwayListener from '@mui/material/ClickAwayListener';

const PopupChart = ({chart: Chart, setOpenChart}) => {
  return (
    <div className='screen-wrapper'>
        <ClickAwayListener onClickAway={()=>setOpenChart("")}>
            <div className='popup-chart-wrapper'>
                <Chart/>
            </div>
        </ClickAwayListener>
    </div>
  )
}

export default PopupChart