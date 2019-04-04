import { useState } from 'react';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    console.log(values);
    if (e) event.preventDefault();
      callback();
  };

  const handleChange = (e) => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleResidue = (e) => {
    e.persist();
    
  }

  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useForm;
