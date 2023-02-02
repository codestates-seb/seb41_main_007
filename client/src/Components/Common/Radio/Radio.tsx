interface props {
  value?: string;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  children?: string;
  onSave: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<props> = ({
  children,
  value,
  name,
  defaultChecked,
  disabled,
  onSave,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // console.log(value);
    onSave(e);
  };

  return (
    <label>
      <input
        className="px-8 "
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default Radio;
// import React from 'react';

// export default function Radio() {
//   return <div>Radio</div>;
// }
