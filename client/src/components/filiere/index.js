import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';

import CreateModal from '../Modals/PopUpModal';
import UpdateModal from '../Modals/PopUpModal';
import ConfirmModal from '../Modals/ConfirmDeletionModal';
import SearchInput from '../Controls/CustomInput'
import Table from '../Controls/Table'

import { getFilieres ,editFiliere, deleteFiliere ,addFiliere } from '../../store/actions/filiereActions';

import PageLoading from '../Controls/Loading/pageLoading';
import './filiere.css'
import { AddIcon } from '../../Icons';
import { Redirect } from 'react-router-dom';

function Filiere() {

    const [searchInput, setSearchInput] = useState("");

    const [showCreateModal,setShowCreateModal] = useState(false)
    const [updateAbvname,setUpdateAbvname] = useState('')
    const [IdToUpdate,setIdToUpdate] = useState('')
    const [updateFiliereName,setUpdateFiliereName] = useState('')

    const [ID, setID] = useState('');
    const [newAbvname, setNewAbvname] = useState('');
    const [newFiliere, setNewFiliere] = useState('');

    const [filieres,setFilieres] = useState([])
  
    //redux states
    const isloading = useSelector(state => state.flrStore.isloading)
    const Filieres = useSelector(state => state.flrStore.filieres)
    const onCRUDAction = useSelector(state => state.flrStore.onCRUDAction)
    const islogin = useSelector(state => state.auth.islogin)
   const dispatch = useDispatch()

   useEffect(() => {
      if (islogin && Filieres?.length === 0) {
        dispatch(getFilieres())
        setFilieres(Filieres)
      }
   },[]);
    

    useEffect(() => {
      setFilieres(Filieres)
    },[Filieres]);
 
  
  const filter = () =>{
    if (!searchInput)
      setFilieres(Filieres)
    else
    {
      const filterdFlrs = Filieres.filter(flr =>
        (String(flr.abvname).toLowerCase()).startsWith(searchInput.toLowerCase()) 
        ||
        (String(flr.name).toLowerCase()).startsWith(searchInput.toLowerCase())
      )
      setFilieres(filterdFlrs)
    }
  }

  const handleEdit = () =>{
    const flr = {
       id: IdToUpdate,
       abvname: updateAbvname,
       name: updateFiliereName
    }
    dispatch(editFiliere(flr))
    return true
  }

  const handleDelete = (id) =>{
    dispatch(deleteFiliere(id))
  }

  const handleAdd = () =>{
    if (newAbvname && newFiliere)
    {
      dispatch(addFiliere(newAbvname,newFiliere))
      return true
    }
    else return false
  }

  const OpenUpdateModal = (id) =>{
    const flr = Filieres.find(filiere => filiere._id === id)
    const {_id,abvname,name} = flr
    setIdToUpdate(_id)
    setUpdateAbvname(abvname)
    setUpdateFiliereName(name)
  }

  const CloseModal= ()=>{
    setShowCreateModal(false)
    setIdToUpdate('')
    setUpdateAbvname('')
    setUpdateFiliereName('')
    setNewFiliere('')
    setNewAbvname('')
  }

  return (
    <>
     {  
        !islogin ? <Redirect to='/login'/> :
          /* create */
          showCreateModal ? 
          <CreateModal
            customizeInput = "createModal__Input"
            title = 'Nouveau Filière'
            inputs = {[
              {keyValue:1, placeholder: "Abreviation", value: newAbvname , setValue: setNewAbvname},
              {keyValue:2, placeholder: "Filiere", value: newFiliere , setValue: setNewFiliere},
            ]}
            sumbitButton='Ajouter'
            cancelButton='Annuler'
            DoAction = {() => handleAdd()}
            close ={() => CloseModal()}
          /> : null
        }
        {
          // update Modal
          updateAbvname && updateFiliereName ? 
          <UpdateModal
            customizeInput = "createModal__Input"
            title = 'Modification du filière'
            inputs = {[
              {keyValue:1,placeholder: "Abreviation" , value: updateAbvname , setValue:setUpdateAbvname},
              {keyValue:2,placeholder: "Filiere" , value: updateFiliereName ,setValue: setUpdateFiliereName},
            ]}
            sumbitButton = 'Changer'
            cancelButton = 'Annuler'
            DoAction = {() => handleEdit()}
            close ={() => CloseModal()}
          /> : null
        }
        {
            /* delete */
            ID ? 
            <ConfirmModal 
              text = "Voulez-vous vraiment supprimer ce filiere?"
              Delete={() =>handleDelete(ID)}
              close ={() => setID('')}
            />: null
        }      
        {
          isloading ? <PageLoading/> : 
          <div className="filieres__content">
          {/* search and add new */}
            <div className="filieres__search__add">
            {/* add */}
            <AddIcon onClick={()=> setShowCreateModal(true)} className='Icon filieres__content__addIcon'/>
          
            {/* <div
              className="filieres__addIcon Icon" 
              onClick = {()=> setShowCreateModal(true)}
              >
                <img src="images/add.svg" alt="adding"/>
            </div> */}

            {/* custom input */}
            <SearchInput
                className='filieres__Input'
                value={searchInput} 
                setValue={setSearchInput} 
                placeholder = "Recherche du filiere" 
                search={true}
                filter ={filter}
              />
          </div>

          {/* table */}
            <Table
              collection = {filieres}
              onCRUDAction = {onCRUDAction} 
              headers = {["Abréviation","Filiere"]}
              OpenDeleteModal = {setID}
              OpenUpdateModal = {OpenUpdateModal}
            />
        </div>
        } 
    </>
     
  )
}

export default Filiere
