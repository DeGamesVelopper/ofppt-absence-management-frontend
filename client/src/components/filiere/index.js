import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';

import CreateModal from '../Modals/createModal';
import ConfirmModal from '../Modals/ConfirmDeletionModal';
import SearchInput from '../Controls/CustomInput'
import Table from '../Controls/Table'

import { getFilieres ,editFiliere, deleteFiliere ,addFiliere } from '../../store/actions/filiereActions';

import PageLoading from '../Controls/Loading/pageLoading';
import './filiere.css'

function Filiere() {
 
    const [searchInput, setSearchInput] = useState("");
    const [showCreateModal,setShowCreateModal] = useState(false)
    const [ID, setID] = useState('');
    const [abvname, setAbvname] = useState('');
    const [filiere, setFiliere] = useState('');

    const [filieres,setFilieres] = useState([])
  
    const isloading = useSelector(state => state.flrStore.isloading)
    const Filieres = useSelector(state => state.flrStore.filieres)
    const filiere_onDeletion = useSelector(state => state.flrStore.onDeletion)
    const filiere_onAdding = useSelector(state => state.flrStore.onAdding)
    

   const dispatch = useDispatch()

   useEffect(() => {

     if (Filieres && !Filieres.length>0) {
        dispatch(getFilieres())
        setFilieres(Filieres)
     }
   },[dispatch,Filieres]);

   useEffect(() => {
    setFilieres(Filieres)
  },[Filieres]);
 
  
  const filter = () =>{
    if (!searchInput)
      setFilieres(Filieres)
    else
    {
      const filterdFlrs = Filieres.filter(flr=>
        (String(flr.abvname).toLowerCase()).startsWith(searchInput.toLowerCase()) 
        ||
        (String(flr.name).toLowerCase()).startsWith(searchInput.toLowerCase())
      )
      setFilieres(filterdFlrs)
    }
  }

  const handleEdit = (id) =>{
    dispatch(editFiliere(id))
  }

  const handleDelete = (id) =>{
    dispatch(deleteFiliere(id))
  }

  const handleAdd = () =>{
    if (abvname && filiere)
      dispatch(addFiliere(abvname,filiere))
  }

  const CloseModal= ()=>{
    setShowCreateModal(false)
    setFiliere('')
    setAbvname('')
  }

  return (
    <>
      {
        /* create */
        showCreateModal ? 
        <CreateModal
          title = 'Nouveau Filière'
          inputs = {[
            {placeholder: "Abreviation" , value: abvname , setValue: setAbvname},
            {placeholder: "Filiere" , value: filiere , setValue: setFiliere},
          ]}
          customizeInput = "createModal__Input"
          close ={() => CloseModal()}
          Add = {() => handleAdd()}
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
          <div
            className="filieres__addIcon" 
            onClick = {()=> setShowCreateModal(true)}
            >
              <img src="images/add.svg" alt="adding"/>
          </div>

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
            onDeletion = {filiere_onDeletion} 
            onAdding = {filiere_onAdding}
            headers = {["Abréviation","Filiere"]}
            collection = {filieres}
            setID = {setID}
            handleEdit = {handleEdit}
          />
      </div>
      } 
    </>
     
  )
}

export default Filiere
