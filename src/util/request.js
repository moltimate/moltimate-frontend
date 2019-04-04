import { useState, useEffect } from 'react';
import axios from 'axios';

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'multipart/form-data'
 }

const dummyPayload = {
  type: 'SELF',
  pdbId: '1YPH',
  ecNumber: '3.4.21.*',
  activeSiteResidues: ['Ser E 195', 'Gly E 196', 'Gly E 193', 'Asp C 102', 'His C 57'],
}

const useForm = (callback) => {
  const [values, setValues] = useState({});
  const [result, setResult] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false
  });
  const [request, setRequest] = useState();

  const queryURL = 'http://localhost:8080/test/motif';

  const handleSubmit = (e) => {
    if (e) event.preventDefault();

    /* Build the form data */
    const form_data = new FormData();

    for ( let key in dummyPayload ) {
        form_data.append(key, dummyPayload[key]);
    }

    if (!values) return;
    setResult({
      data: null,
      pending: true,
      error: false,
      complete: false
    });
    axios.post(queryURL, form_data)
      .then(result =>
        setResult({
          headers,
          data: result.data,
          pending: false,
          error: false,
          complete: true
        })
      ).catch(() =>
          setResult({
            data: null,
            pending: false,
            error: true,
            complete: true
          })
        );
  };

  const handleChange = (e) => {
    console.log(result);
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleChipInput = (e) => {
    setValues(values => ({ ...values, testPdbIds: e}))
  }

  const handleResidues = (e) => {
    // index in values.residues array t.id

    // t.value is string value to merge
    // console.log(e.target.id);
    // console.log(e.target.value);
    // console.log(e.target.placeholder);
    e.persist();

  }

  const handleClear = (e) => {
    setValues(values => ({}))
  }

  return {
    handleChange,
    handleSubmit,
    handleChipInput,
    handleResidues,
    handleClear,
    values,
    result
  }
};

export default useForm;
