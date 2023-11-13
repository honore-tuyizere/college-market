import React, { RefObject, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { IProduct } from "../../types";
import { searchProducts } from "../../apis/search";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SearchComponent: React.FC = () => {
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchProducts(query);
      if (Array.isArray(results)) {
        setProducts(results);
      } else {
        console.error("searchProducts did not return an array");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setProducts([]);
    }
  };

  React.useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  React.useEffect(() => {
    if (selectedProduct) {
      history(`/product/${selectedProduct._id}`);
      setSearchQuery("");
    }
  }, [selectedProduct, history]);

  const filteredProducts =
    searchQuery === ""
      ? []
      : products.filter((product) => {
          return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

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
  useOnClickOutside(ref, () => setSearchQuery(""));

  return (
    <div className='fixed top-4 ' ref={ref}>
      <div className='mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'>
        <Combobox
          onChange={(value) => {
            const product = products.find((product) => product.name === value);
            setSelectedProduct(product || null);
          }}
        >
          <div className='relative'>
            <MagnifyingGlassIcon
              className='pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
            <Combobox.Input
              className='h-12 w-96 border-2 rounded-full border-gray-400 bg-teal-50 pl-11 pr-4 text-gray-900 placeholder:text-gray-500 focus:ring-1 focus:ring-gray-700 sm:text-sm'
              placeholder='Search...'
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          {filteredProducts.length > 0 && (
            <Combobox.Options
              static
              className='max-h-96 scroll-py-3 overflow-y-auto p-3'
            >
              {filteredProducts.map((product) => (
                <Combobox.Option
                  key={product._id}
                  value={product.name} 
                  onClick={() => setSelectedProduct(product)} 
                  className={({ active }) =>
                    classNames(
                      "flex cursor-default select-none rounded-xl p-3",
                      active ? "bg-gray-100" : "bg-white",
                    )
                  }
                >
                  {({ active }) => (
                    <>
                      <div
                        className={classNames(
                          "flex h-10 w-10 flex-none products-center justify-center rounded-lg",
                        )}
                      >
                        <img
                          src={product.thumbnail}
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='ml-4 flex-auto'>
                        <p
                          className={classNames(
                            "text-sm font-medium",
                            active ? "text-gray-900" : "text-gray-700",
                          )}
                        >
                          {product.name}
                        </p>
                        <p
                          className={classNames(
                            "text-sm",
                            active ? "text-gray-700" : "text-gray-500",
                          )}
                        >
                          {product.description}
                        </p>
                      </div>
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}

          {searchQuery !== "" && filteredProducts.length === 0 && (
            <div className='px-6 py-14 text-center text-sm sm:px-14'>
              <ExclamationCircleIcon
                type='outline'
                name='exclamation-circle'
                className='mx-auto h-6 w-6 text-gray-400'
              />
              <p className='mt-4 font-semibold text-gray-900'>No results found</p>
              <p className='mt-2 text-gray-500'>
                No products found for this search term. Please try again.
              </p>
            </div>
          )}
        </Combobox>
      </div>
    </div>
  );
};

export default SearchComponent;
