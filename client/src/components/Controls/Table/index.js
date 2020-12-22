
import Loading from '../Loading'
import './table.css'

function CustomTable({onDeletion,onAdding,headers,collection,setID,handleEdit,headerColor}) {
  return (
      <div className= "table">
        {
         /* delete or adding loading */
         onDeletion || onAdding ? <Loading className="onLoading" /> : null
        }
        { 
          collection ?
          <table className="content-table">
              <thead>
                <tr style ={{backgroundColor:headerColor}}>
                  {
                    headers.map(head =>
                      <th key={Math.random(0,100)}>{head}</th>
                    )
                  }
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  collection.map( item =>
                      <tr key = {item._id} style = { collection[collection.length-1] ===item ? {borderBottom:`0.125rem solid ${headerColor}`}:null}>
                          <td>{item.abvname}</td>
                          <td>{item.name}</td>
                          <td  
                            className="editIcon"
                            onClick={()=> handleEdit(item._id)}
                          >
                            <img src='images/edit.png' alt="editing"/>
                          </td>
                          <td
                            className="deleteIcon" 
                            onClick={()=> setID(item._id)}
                          >
                            <img src='images/delete.png' alt="deleting"/>
                          </td>
                      </tr>
                  )
                }
              </tbody>
            </table>
          :<div className="emptyTable">NO Filiere</div> //remove this later
        }
      </div>
  )
}

export default CustomTable
