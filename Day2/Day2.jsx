import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOff from '@mui/icons-material/VolumeOff';

function PrettoSlider(props) {
  const { colorIntensity, ...otherProps } = props;

  const sliderColor = props.colorIntensity !== null
    ? `rgb(${colorIntensity}, ${255 - colorIntensity}, 0)`
    : null;

  const sliderThumbBoxShadow = props.colorIntensity !== null
    ? `0px 0px 8px rgba(${colorIntensity}, ${255 - colorIntensity}, 0, 0.8)`
    : null;

  const sliderValueLabelBackgroundColor = props.colorIntensity !== null
    ? `rgba(${colorIntensity}, ${255 - colorIntensity}, 0, 0.9)`
    : null;

  const sliderMarkBackgroundColor = props.colorIntensity !== null
    ? `rgba(${colorIntensity}, ${255 - colorIntensity}, 0, 0.6)`
    : null;

  const sliderMarkLabelColor = props.colorIntensity !== null
    ? `rgba(${colorIntensity}, ${255 - colorIntensity}, 0, 0.6)`
    : null;

  return (
    <Slider
      {...otherProps}
      sx={{
        color: sliderColor,
        '& .MuiSlider-thumb': {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: sliderThumbBoxShadow,
          },
        },
        '& .MuiSlider-valueLabel': {
          fontSize: 15,
          fontFamily: 'inherit',
          color: 'black',
          backgroundColor: sliderValueLabelBackgroundColor,
          borderRadius: 5,
          padding: '7px',
        },
        '& .MuiSlider-mark': {
          backgroundColor: sliderMarkBackgroundColor,
        },
        '& .MuiSlider-markLabel': {
          color: sliderMarkLabelColor,
        },
      }}
    />
  );
}

export default function EnhancedSlider() {
  const [value, setValue] = React.useState(30);
  const [muted, setMuted] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
    setValue(muted ? 30 : 0);
  };

  const colorIntensity = muted ? null : Math.min(255, Math.round((value / 100) * 255));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ width: 300, p: 4, borderRadius: 10, backgroundColor: '#f0f0f0' }}>
        <Stack spacing={2} direction="row" alignItems="center">
          {muted ? (
            <VolumeOff sx={{ fontSize: 28, color: '#d9534f', cursor: 'pointer' }} onClick={handleMuteToggle} />
          ) : (
            <VolumeDown sx={{ fontSize: 28, color: '#888', cursor: 'pointer' }} onClick={handleMuteToggle} />
          )}
          <PrettoSlider
            aria-label="Volume"
            value={muted ? 0 : value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
            colorIntensity={colorIntensity}
          />
          <VolumeUp
            sx={{
              fontSize: 28,
              color: colorIntensity !== null
                ? `rgb(${colorIntensity}, ${255 - colorIntensity}, 0)`
                : null,
              cursor: 'pointer',
            }}
          />
        </Stack>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <span>Min ↓</span>
          <span>Max ↑</span>
        </Box> */}
      </Box>
    </Box>
  );
}
