import React, { RefObject, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { IProduct } from "../../types";
import { searchProducts } from "../../apis/search";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";

interface ISearchComponentProps {
  closeMobileMenu?: () => void;
}
const SearchComponent: React.FC<ISearchComponentProps> = ({ closeMobileMenu }) => {
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const searchMutation = useMutation({ mutationFn: searchProducts });
  const handleSearch = async (query: string) => {
    try {
      searchMutation.mutate(query, {
        onSuccess(results) {
          if (Array.isArray(results)) {
            setProducts(results);
          } else {
            setProducts([]);
          }
        },
        onError() {
          setProducts([]);
        },
      });
      // const results = await searchProducts(query);
      // if (Array.isArray(results)) {
      //   setProducts(results);
      // } else {
      //   console.error("searchProducts did not return an array");
      //   setProducts([]);
      // }
    } catch (error) {
      console.error("Error searching products:", error);
      setProducts([]);
    }
  };

  React.useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  React.useEffect(() => {
    if (selectedProduct) {
      history(`/product/${selectedProduct._id}`);
      setSearchQuery("");
      if (closeMobileMenu) {
        closeMobileMenu();
      }
    }
  }, [selectedProduct, history, closeMobileMenu]);

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
    <div className='w-full overflow-visible' ref={ref}>
      <div className='mx-auto w-full bg-gray-200 transform rounded-xl bg-transparent transition-all'>
        <Combobox
          onChange={(value) => {
            const product = products.find((product) => product.name === value);
            setSelectedProduct(product || null);
          }}
        >
          <div className='flex items-center justify-center w-full'>
            <MagnifyingGlassIcon
              className='pointer-events-none absolute  right-4 h-6 w-6 text-gray-400'
              aria-hidden='true'
            />
            <Combobox.Input
              className='h-10 border rounded-full w-full border-gray-300  px-4 text-gray-900 placeholder:text-gray-400 text-sm'
              placeholder='Search Product'
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          {filteredProducts.length > 0 && (
            <Combobox.Options
              static
              className='max-h-96 bg-white scroll-py-3 overflow-y-auto p-3 md:absolute w-[400px] top-12 md:left-1/2 md:transform md:-translate-x-1/2 z-[100] md:shadow-xl'
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

          {searchQuery !== "" &&
            searchQuery.length > 1 &&
            filteredProducts.length === 0 &&
            !searchMutation.isPending && (
              <div className='px-6 py-14 text-center text-sm sm:px-14'>
                <ExclamationCircleIcon
                  type='outline'
                  name='exclamation-circle'
                  className='mx-auto h-6 w-6 text-gray-400'
                />
                <p className='mt-4 font-semibold text-gray-900'>No results found</p>
              </div>
            )}
        </Combobox>
      </div>
    </div>
  );
};

export default SearchComponent;
