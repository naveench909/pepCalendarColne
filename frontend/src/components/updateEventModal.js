import React , {useState } from  'react'
import Modal from  'react-modal'
import Datetime from 'react-datetime';
import { useGlobalContext } from "../context";


const UpdateEventModal = ({isUpdateOpen , onUpdateClose , onUpdateEventAdded})=>{
 
    const{events , setEvents , handleEventClick ,setUpdateModalOpen , updateModalOpen , uid} = useGlobalContext();
    const [classData , setClassData] = useState({teacherName:"" ,  batchName:""});
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());  
    const [title , setTitle] = useState("");
    const [status, setStatus] = useState(null);

    let name ,value;
    const handleInputs = (e)=>{

        name = e.target.name;
        value = e.target.value;

        setClassData({...classData , [name]:value})
    }

    const updateData = async (e)=>{
        // e.preventDefault();     

        const{teacherName , batchName} = classData;

        // how to get event
        const res = await fetch(`/${uid}` , {
            method : "PUT", 
            headers :{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                title , teacherName , batchName , start , end
            })
        }); 

        const data = await res.json();

        if(res.status === 500 || !data){
            window.alert("invalid submission");
            console.log("invalid submission");
        }else{
            window.alert("successfully submitted ");
            console.log("successfully submitted ");
        }

        onUpdateEventAdded({
            title,
            teacherName,
            batchName,
            start,
            end
        });

        onUpdateClose();
    }

    const deleteData = async (e) =>{
        // e.preventDefault();
        console.log("from update",uid);
        await fetch(`/${uid}`, { method: 'DELETE' });
        setStatus('Delete successful');

        onUpdateClose();
    }   

    return (
        <Modal className="modal" isOpen ={isUpdateOpen} onRequestClose ={onUpdateClose}>
                <form method = "PUT" className="form" onSubmit={updateData}>
                    <div className="teacher-name">
                        <label>Teacher Name</label>
                        <div>
                            <input type="text" name="teacherName" placeholder = "Teacher Name" value={classData.teacherName} onChange={handleInputs}/>
                        </div>
                    </div>
                    
                    <div className="batch-name">
                        <label>Batch Name</label>
                        <div>
                            <input type="text" name="batchName" placeholder = "Batch Name" value={classData.batchName} onChange={handleInputs}/>
                        </div>
                    </div>                  

                    <div className="start-date">
                        <label>Start date</label>
                        <Datetime  value={start} onChange={date => setStart(date)} />                
                        
                    </div>

                    <div className="end-date">
                        <label>End date</label>
                        <Datetime  value={end} onChange={date => setEnd(date)} />                
                    </div>

                    <div  style={{"marginTop": "20px" , "color":"black" , "display": "flex"}}>
                        <button className="btn" onClick={updateData}>Update Schedule</button>
                        <button className="btn" onClick={deleteData}>Delete Schedule</button>

                    </div>

                </form>
        </Modal>
    )
}

export default UpdateEventModal;