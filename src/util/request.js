import { useState, useEffect } from 'react';
import axios from 'axios';

import testMakerResponse from './testMakerResponse';
import testSearchResponse from './testSearchResponse';

// TODO make this a config file
const testQueryURL = '/test/motif';
const searchQueryURL = '/align/activesite';
const dockRequestURL = '/dock/dockligand';
const dockingMoleculeFileRetrievalURL = '/dock/retrievefile';
const exportDockingInfoURL = '/dock/exportLigands';
const ligandLibraryURL = '/ligands';

const useForm = (defaultURL, defaultValues = {}, callback = ()=>{}) => {
  const [values, setValues] = useState(defaultValues);
  const [currentMode, setCurrentMode] = useState('');
  const [result, setResult] = useState({
    data: null,
    complete: false,
    pending: false,
    error: null,
    mode: currentMode
  });
  const [request, setRequest] = useState(null);
  const [formStatus, setFormStatus] = useState(null);
  const [url, setURL] = useState(defaultURL);

  const handleSubmit = (e, clearEClass) => {
    if(clearEClass) clearEClass();
    if (e) {
      e.preventDefault();
      e.persist();
    }

    var queryURL = currentMode === 'test' ? testQueryURL : url;

    const form_data = new FormData();
    for ( let key in values ) {
      if ( String(key) === 'activeSiteResidues') {
        form_data.append(key, values.activeSiteResidues.map(a => {
          return `${a.residueName} ${a.residueChainName} ${a.residueId}`
        }));
      //ligand and molecule attributes are files, and need special treatment
      } else if(String(key) === 'ligand' || String(key).startsWith('molecule')){
        //here we can expect the value to be a File object
        form_data.append(key, values[key], values[key].name);

      } else if(String(key) === 'proteinFiles') {
          form_data.append(key, values[key][0]);
      } else {
          form_data.append(key, values[key]);
      }
    }

    setResult({
      data: null,
      pending: true,
      error: null,
      complete: false,
      mode: currentMode,
    });

    axios.post(queryURL, form_data)
      .then(result =>{
        setResult({
          data: result.data,
          pending: false,
          error: null,
          complete: true,
          mode: currentMode,
        })
        callback(values,result);
      }).catch((error) =>{
        setResult({
          data: null,
          pending: false,
          error: error,
          complete: true,
          mode: currentMode,
        })
        callback(values,result);
      });   
  };

  /* Generic input handleChange */
  const handleChange = (e) => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
  };

  /* add an attribute-value pair to the values object*/
  const setFormValue = (attribute, attributeValue) => {
    setValues(values => ({ ...values, [attribute]: attributeValue }));
  }
  /** necessary because a successive remove value/set value wont work b/c asyncronous */
  const replaceFormField = (oldAttribute, newAttribute, newValue) => {
    let modifiedValues = { ...values, [newAttribute]: newValue }
    delete modifiedValues[oldAttribute];
    setValues(modifiedValues);
  }

  /* Chipinput API only returns the value, not a full event */
  const handleChipInput = (e, key) => {
    setValues(values => ({ ...values, [key]: e}))
  }

  // TODO
  const handleFileUpload = (e) => {
    setValues({ ...values, [e.target.name]: Array.from(e.target.files)});
  }

  /* Use this to create alignment objects for active site residue array */
  const handleResidues = (e) => {
    e.persist();

    values.activeSiteResidues = values.activeSiteResidues || [];

    const copy = values.activeSiteResidues;
    copy[e.target.id] = copy[e.target.id] || {};
    copy[e.target.id] = { ...copy[e.target.id], [e.target.name]: e.target.value};
    setValues(values => ({ ...values, activeSiteResidues: copy}));
  }

  /* Clears the values of state */
  const handleClearValues = (e) => {
    setValues({});
    setResult({
      data: null,
      complete: false,
      pending: false,
      error: null,
    });
  }

  const handleSetMode = (value) => {
    setCurrentMode(value);
  }

  const handleFileDelete = (value, x, key) => {
    const copy = values[key].filter((f) => {
      return f.name !== value;
    });
    setValues(values => ({ ...values, [key]: copy}));
  }

  const setQueryURL = (newURL) =>{
    setURL(newURL);
  }

  return {
    handleChange,
    handleSubmit,
    handleFileUpload,
    handleChipInput,
    handleResidues,
    handleClearValues,
    handleFileDelete,
    setFormValue,
    replaceFormField,
    values,
    handleSetMode,
    result,
    setQueryURL,
  }
};

export default useForm;
export { dockRequestURL, searchQueryURL, dockingMoleculeFileRetrievalURL, exportDockingInfoURL, ligandLibraryURL };
