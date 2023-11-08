import { useState, Fragment, FC, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getColleges } from "../../services/colleges";
import { queryKeys } from "../../utils/queryKeys";
import { ICollege } from "../../types";

interface CollegeSelectorProps {
  collegeChanged: (college: string) => void;
}
const CollegeSelector: FC<CollegeSelectorProps> = ({ collegeChanged }) => {
  const [selected, setSelected] = useState<ICollege>();
  const [query, setQuery] = useState("");
  const { data } = useQuery({
    queryFn: getColleges,
    queryKey: queryKeys.getColleges,
  });
  const filteredCollege =
    query === ""
      ? data
      : data?.filter((college) =>
          college.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  useEffect(() => {
    selected && collegeChanged(selected?.name);
  }, [collegeChanged, selected]);
  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className='relative mt-1'>
        <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
          <Combobox.Input
            placeholder='Type college name'
            className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 border-action-color-500 border outline-none'
            displayValue={(college: ICollege) => college.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
            {filteredCollege?.length === 0 && query !== "" ? (
              <Combobox.Option
                className={"relative cursor-default select-none py-2 pl-10 pr-4"}
                value={{ id: null, name: query }}
              >
                Create "{query}"
              </Combobox.Option>
            ) : (
              filteredCollege?.map((college) => (
                <Combobox.Option
                  key={college._id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? " bg-action-color-500 text-white" : "text-gray-900"
                    }`
                  }
                  value={college}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {college.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : " text-action"
                          }`}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default CollegeSelector;
