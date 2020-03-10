import { useCallback } from "react"
import useForm from "./util/request"

/** 
 *  @param {string} macromolecule the ID of the protein to dock
 *  @param {Array} ligands an array of objects representing ligands with the following 
 *    attributes:
 *      name: name of ligand
 *      file: the file representing the ligand
 *  @param {object} center an object representing the center of the docking search zone
 *    with the following attributes:
 *      x: x coordinate of center
 *      y: y coordinate of center
 *      z: z coordinate of center
 *  @param {object} boundaries an object representing the size of the docking search zone with
 *    the following attributes:
 *      x: size of x dimension of zone
 *      y: size of y dimension of zone
 *      z: size of z dimension of zone
 */
const dockLigands = (macromolecule, ligands, center, boundaries, callback) =>{

  const dockQueryURL = 'http://localhost:8080/dock/dockligand';

  const {handleSubmit, setValue, setQueryURL} = useForm();
  setValue("center_x", center.x);
  setValue("center_y", center.y);
  setValue("center_z", center.z);
  setValue("size_x", boundaries.x);
  setValue("size_y", boundaries.y);
  setValue("size_z", boundaries.z);
  setQueryURL(dockQueryURL);

  setValue("macromolecule",macromolecule);
  for(let ligand in ligands){
    
    setValue("uploaded_ligand", ligand.file);
    
    
    handleSubmit();
  }

  callback;
}