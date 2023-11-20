interface Option {
  value: string | boolean | number;
  label: string;
}

export const typeActiveStatus: Option[] = [
  { label: 'On', value: true },
  { label: 'Off', value: false }
];
