const CategoryHeader = () => {
  return (
    <section className='w-full px-6 md:px-12 lg:px-24 bg-action-color-500 text-white p-3 flex gap-4 overflow-auto category-strip'>
      <div className='shrink-0'>Category name</div>
      <div className='shrink-0'>Category name</div>
      <div className='shrink-0 active'>Category name</div>
      <div className='shrink-0'>Category name</div>
      <div className='shrink-0'>Category name</div>
    </section>
  );
};

export default CategoryHeader;
