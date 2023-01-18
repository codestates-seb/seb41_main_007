import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Address from './Address';
const options = ['one', 'two', 'three'];
const defaultOption = options[0];

const Dropdowns: React.FC = () => {
  return (
    <>
      <Dropdown
        options={options}
        // onChange={this._onSelect}
        value="배송지"
        placeholder="Select an option"
      />
      ;
    </>
  );
};
export default Dropdowns;
