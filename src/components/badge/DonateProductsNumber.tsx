import React, { useState, useEffect } from "react";
import { getDonateProductsNumber } from "../../apis/donation";

export const DonateProductsNumber: React.FC = () => {
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDonateProductsNumber();
      setData(result.number);
    };
    fetchData();
  }, []);

  if (data === null || data === 0) {
    return null;
  }

  const displayData = data > 10 ? "10+" : data;

  return (
    <div>
      <p className='inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-700'>
        {displayData}
      </p>
    </div>
  );
};
