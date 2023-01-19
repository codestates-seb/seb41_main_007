interface props {
  label?: string;
  children: any;
}

const RadioGroup: React.FC<props> = ({ label, children }) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
};
export default RadioGroup;
