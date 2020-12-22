
import Input from '../../Controls/CustomInput'

import  './createModal.css';


const CreateModal = ({Add,close,inputs,customizeInput,title}) => {

   const AddFiliere = () =>{
      Add()
      CloseModal()
   }
  
   const CloseModal= () =>{
      const modal = document.querySelector('.createModal')
      if(modal){
        modal.classList.add('fadeOut')
        setTimeout(() => {
          close()
        }, 300);
       }
   }

   const closeModalOnClick =(e)=> { 
    const elemClicked = e.target.classList.value
    if (elemClicked.includes("Modal__container") || elemClicked.includes("createModal__annuler") || elemClicked.includes("createModal__closeIcon") || elemClicked.includes("createModal__icon") || elemClicked.includes("txt")) 
      CloseModal()
    }

    return (
      <>
        { 
          inputs ?
          <div className ="Modal__container " onClick = {e =>closeModalOnClick(e)}>
            <div className="createModal flex_column fadeIn">
              <div className="createModal__closeIcon">
                <img 
                  className="createModal__icon"
                  src="images/closeIcon.svg"
                  alt="closeModal"
                  onClick = {e =>closeModalOnClick(e)}
                />
              </div>
              <div className="createModal__title">
                <span>{title}</span>
              </div>
              <div className="createModal__inputs flex_column">
                {
                  inputs.map(input =>
                    <Input 
                       className = {customizeInput}
                       placeholder = {input.placeholder}
                       value = {input.value}
                       setValue = {input.setValue}
                    />
                  )
                }
              </div>
      
              <div className= "createModal__buttons">
                {/* button Ajouter */}
                <button
                  className = "createModal__ajouter" 
                  onClick = {()=>{ AddFiliere()}}
                >
                  <span>Ajouter</span>
                </button>
                {/* button Annuler */}
                <button 
                  className = "createModal__annuler" 
                  onClick = {e =>closeModalOnClick(e)}
                >
                  <span className="txt">Annuler</span>
                </button>
              </div>
            </div>
         </div>
          : alert('empty inputs')   // remove this 
        }
     </>
  )
}

export default CreateModal
