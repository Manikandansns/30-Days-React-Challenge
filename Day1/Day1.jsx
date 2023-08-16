import * as React from 'react';
import Slider from '@mui/material/Slider';
import './Day1.css'; // Import the external CSS file

const marks = [
  {
    value: 0,
    label: '1',
  },
  {
    value: 25,
    label: '2',
  },
  {
    value: 50,
    label: '3',
  },
  {
    value: 75,
    label: '4',
  },
  {
    value: 100,
    label: '5',
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  if (value === 0) {
    return <span className="emoji">😡</span>;
  } else if (value === 25) {
    return <span className="emoji">😞</span>;
  } else if (value === 50) {
    return <span className="emoji">😀</span>;
  } else if (value === 75) {
    return <span className="emoji">🤩</span>;
  } else if (value === 100) {
    return <span className="emoji">🥳</span>;
  } else {
    return value;
  }
}

export default function DiscreteSliderValues() {
  return (
    <div className="center-container">
      <div className="slider-container">
        <Slider
          aria-label="Restricted values"
          defaultValue={3}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
          color='secondary'
        />
      </div>
    </div>
  );
}
