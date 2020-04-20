import { useState, useEffect } from 'react';
import axios from 'axios';

import testMakerResponse from './testMakerResponse';
import testSearchResponse from './testSearchResponse';

// TODO make this a config file
const testQueryURL = 'http://localhost:8080/test/motif';
const searchQueryURL = 'http://localhost:8080/align/activesite';
const dockRequestURL = 'http://localhost:8080/dock/dockligand';
const dockingMoleculeFileRetrievalURL = 'http://localhost:8080/dock/retrievefile';
const exportDockingInfoURL = 'http://localhost:8080/dock/exportLigands';
const ligandLibraryURL = 'http://localhost:8080/ligands';

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
    
    console.log("submit following values:");
    for(let property in values){
      console.log(`  ${property}: ${values[property]}`)
    }

    var queryURL = currentMode === 'test' ? testQueryURL : url;

    console.log("url: " + queryURL);
    const form_data = new FormData();
    for ( let key in values ) {
      if ( String(key) === 'activeSiteResidues') {
        form_data.append(key, values.activeSiteResidues.map(a => {
          return `${a.residueName} ${a.residueChainName} ${a.residueId}`
        }));
      //ligand and molecule attributes are files, and need special treatment
      } else if(String(key) === 'ligand' || String(key).startsWith('molecule')){
        //here we can expect the value to be a File object
        form_data.append(key, values[key], values[key].name)

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

    console.log("posting query now")

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
    console.log(`attribute ${attribute} set to ${attributeValue}`)
    console.log("saved following values:");
    for(let property in values){
      console.log(`  ${property}: ${values[property]}`)
    }

  }

  /* Chipinput API only returns the value, not a full event */
  const handleChipInput = (e, key) => {
    setValues(values => ({ ...values, [key]: e}))
  }

  // TODO
  const handleFileUpload = (e) => {
    //console.dir(values);
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
    values,
    handleSetMode,
    result,
    setQueryURL,
  }
};

export default useForm;
export { dockRequestURL, searchQueryURL, dockingMoleculeFileRetrievalURL, exportDockingInfoURL, ligandLibraryURL };
