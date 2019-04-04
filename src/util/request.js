import { useState } from 'react';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (e) => {
    if (e) event.preventDefault();
      callback();
  };

  const handleChange = (e) => {
    console.log(e.target.name + '   ' + e.target.value);
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleResidue = (e) => {
    
  }

  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useForm;
