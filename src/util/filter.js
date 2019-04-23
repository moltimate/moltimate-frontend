import { useState } from 'react';

import useForm from './request';

const useFilters = (callback) => {
  const [filters, setFilters] = useState({});
  const { sortData } = useForm();

  /* Generic filter handleChange */
  const handleFilter = (e) => {
    e.persist();
    console.log(e.target.name)

    setFilters(filters => ({ ...filters, [e.target.name]: e.target.value }));
    sortData(filters);
  };

  return {
    handleFilter,
    filters,
  }
};

export default useFilters;
