import React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePicker1 = styled(DatePicker)`
  background-color: #2f3338;
  color: white;
`;
interface props {
  onSave: (name: string, value: string) => void;
}

const DatepickerInput: React.FC<props> = ({ onSave }) => {
  // const [value, setValue] = React.useState<Dayjs | null>();
  // if (value) {
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack className="w-96 h-11" spacing={3}>
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label="Year, month and date"
          value={dayjs('2023-01-20')}
          onChange={(newValue) => {
            if (newValue) {
              onSave('date', newValue.format('YYYY년MM월DD일'));
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
