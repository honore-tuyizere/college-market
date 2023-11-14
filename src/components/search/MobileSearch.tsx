import React, { RefObject, useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

export default function MobileSearch() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  function useOnClickOutside(
    ref: RefObject<HTMLDivElement>,
    handler: (event: MouseEvent | TouchEvent) => void,
  ) {
    useEffect(() => {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsMobileSearchOpen(false));
  return (
    <div className='flex gap-2 md:hidden' ref={ref}>
      <div>
        <div className='left-0 right-0 max-w-full flex justify-center items-center bg-slate-100'>
          <MagnifyingGlassIcon
            className='text-black w-5'
            onClick={() => setIsMobileSearchOpen(true)}
          />
          {isMobileSearchOpen && <SearchComponent />}
          <span className='hidden sm:block'>Search</span>
        </div>
      </div>
    </div>
  );
}
