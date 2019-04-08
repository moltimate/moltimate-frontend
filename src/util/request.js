import { useState, useEffect } from 'react';
import axios from 'axios';

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'multipart/form-data'
}

const dummyPayload = {
  type: 'self',
  pdbId: '1YPH',
  ecNumber: '3.4.21.*',
  activeSiteResidues: ['Ser E 195', 'Gly E 196', 'Gly E 193', 'Asp C 102', 'His C 57'],
}

const useForm = (callback) => {
  const [values, setValues] = useState({activeSiteResidues: []});
  const [result, setResult] = useState({
    data: null,
    complete: false,
    pending: false,
    error: {
      type: null,
      message: null,
    },
  });
  const [request, setRequest] = useState();

  const queryURL = 'http://localhost:8080/test/motif';

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    /* Build the form data */
    const form_data = new FormData();
    for ( let key in dummyPayload ) {
        form_data.append(key, dummyPayload[key]);
    }

    if (!!values.pdbId) {
      setResult({ ...results, error: { type: 100, message: 'You must fill out the form.'} });
      return;
    };

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
            error: {
              type: 500,
              message: 'The result could not be retrieve',
            },
            complete: true
          })
        );
  };

  /* Generic input handleChange */
  const handleChange = (e) => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  /* Chipinput API only returns the value, not a full event */
  const handleChipInput = (e) => {
    setValues(values => ({ ...values, testPdbIds: e}))
  }

  // TODO
  const handleFileUpload = (e) => {

  }

  /* Use this to create alignment objects for active site residue array */
  const handleResidues = (e) => {
    e.persist();
    const copy = values.activeSiteResidues;
    copy[e.target.id] = { ...copy[e.target.id], [e.target.name]: e.target.value};
    setValues(values => ({ ...values, activeSiteResidues: copy}));
  }

  /* Clears the values of state */
  const handleClearValues = (e) => {
    setValues({activeSiteResidues: []});
  }

  return {
    handleChange,
    handleSubmit,
    handleFileUpload,
    handleChipInput,
    handleResidues,
    handleClearValues,
    values,
    result
  }
};

export default useForm;
