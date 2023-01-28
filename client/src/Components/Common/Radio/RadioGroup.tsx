interface props {
  label?: string;
  children: any;
}

const RadioGroup: React.FC<props> = ({ label, children }) => {
  return (
    <fieldset className=" w-96 my-2.5 ">
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
};
export default RadioGroup;
