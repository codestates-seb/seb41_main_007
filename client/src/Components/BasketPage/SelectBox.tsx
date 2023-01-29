import {
  Fragment,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  FC,
} from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { TYPE_ProductOption } from 'Types/common/product';
import { useNumberComma } from 'Utils/commonFunction';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
interface Optiontype {
  setOption: Dispatch<SetStateAction<TYPE_ProductOption>>;
  Optiondata: TYPE_ProductOption[];
}

const SelectBox: FC<Optiontype> = ({ setOption, Optiondata }) => {
  const [selected, setSelected] = useState<TYPE_ProductOption>(Optiondata[0]);

  useEffect(() => {
    setOption(selected);
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className=" lock text-sm font-medium text-gray-700"></Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {`${selected.productOptionName} +${useNumberComma(
                    selected.price,
                  )}원`}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Optiondata.map((el, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-green-700' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={el}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate',
                            )}
                          >
                            {`${el.productOptionName} +${useNumberComma(
                              el.price,
                            )}원`}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-grenn-700',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
export default SelectBox;
