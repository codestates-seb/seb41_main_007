import React, { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface props {
  onSave: (name: string, value: string) => void;
}

const DatepickerInput: React.FC<props> = ({ onSave }) => {
  const [value, setValue] = useState('2023-01-20');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack className="w-96 h-11" spacing={3}>
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label={value}
          value={dayjs(value)}
          onChange={(newValue) => {
            if (newValue) {
              setValue(newValue.format('YYYYMMDD'));
              onSave('birth', newValue.format('YYYYMMDD'));
            }
          }}
          renderInput={(params) => (
            <TextField className="w-36" {...params} helperText={null} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};
export default DatepickerInput;
//글자색 맘에안듬
