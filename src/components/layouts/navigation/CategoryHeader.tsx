import { useQuery } from "@tanstack/react-query";
import { getNavbarCategories } from "../../../services/categories";
import { queryKeys } from "../../../utils/queryKeys";
import { useState } from "react";
import classNames from "classnames";

const CategoryHeader = () => {
  const [activeCategory, setActiveCategory] = useState<string>();
  const { data } = useQuery({
    queryFn: getNavbarCategories,
    queryKey: queryKeys.navbarCategoriesKey,
  });
  const activateCategory = (selectedCAtegory: string) => {
    setActiveCategory(selectedCAtegory);
  };
  return (
    <section className='w-full px-6 md:px-12 lg:px-24 bg-action-color-500 text-white p-3 flex gap-4 overflow-auto category-strip'>
      {data?.map((category) => (
        <div
          onClick={() => activateCategory(category._id)}
          key={category._id}
          className={classNames(
            "shrink-0 cursor-pointer",
            activeCategory === category._id ? "active" : "",
          )}
        >
          {category.name}
        </div>
      ))}
    </section>
  );
};

export default CategoryHeader;
