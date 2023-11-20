interface Option {
  value: string | boolean | number;
  label: string;
}

export const groups: Option[] = [
  { value: 'option0', label: 'Opening Range Breakout - Original' },
  { value: 'group 1', label: 'Group 1' },
  { value: 'option2', label: 'Group 2' },
  { value: 'option3', label: 'Group 3' }
];

const TIME_FRAMES = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export const times = TIME_FRAMES.map((time) => ({
  value: time,
  label: time + ' minutes'
}));

export const backtestTimeframes: Option[] = [
  { value: 90, label: '90' },
  { value: 30, label: '30' },
  { value: 7, label: '7' }
];

export const excludeSymbols: Option[] = [
  { value: 'para', label: 'PARA' },
  { value: 'open', label: 'OPEN' }
];

export const includeSymbols: Option[] = [
  { value: 'run', label: 'RUN' },
  { value: 'ionq', label: 'IONQ' }
];

export const typeSymbols: Option[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false }
];
