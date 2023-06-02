import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const tolerances = [
    'Dairy',
    'Egg',
    'Gluten',
    'Grain',
    'Peanut',
    'Seafood',
    'Sesame',
    'Shellfish',
    'Soy',
    'Sulfite',
    'Tree Nut',
    'Wheat'
];

export default function ToleranceSelectCheckmarks() {
  const [tolerance, setTolerance] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTolerance(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{width: 150, height: '52px' }}>
        <InputLabel>Tolerances</InputLabel>
        <Select
          labelId="tolerances"
          multiple
          value={tolerance}
          onChange={handleChange}
          input={<OutlinedInput label="Tolerance" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {tolerances.map((t) => (
            <MenuItem key={t} value={t}>
              <Checkbox checked={tolerance.indexOf(t) > -1} />
              <ListItemText primary={t} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}