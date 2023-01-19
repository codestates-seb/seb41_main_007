interface props {
  value?: string;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  children?: string;
  onSave?: (el: string) => void;
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
    onSave && onSave(value);
  };

  return (
    <label>
      <input
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
