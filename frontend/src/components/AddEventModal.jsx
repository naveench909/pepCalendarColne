import React , {useState } from  'react'
import Modal from  'react-modal'
import Datetime from 'react-datetime';
import { useGlobalContext } from '../context';
import Moment from "moment";
const AddEventModal = ({isOpen , onClose , onEventAdded})=>{

    const{classData,setClassData , start , setStart , end , setEnd , title , events} = useGlobalContext();

    let name ,value;
    const handleInputs = (e)=>{

        name = e.target.name;
        value = e.target.value;

        setClassData({...classData , [name]:value})
    }

    const available = ()=>{
       let newEvents = events.filter((task)=>{ return task.teacherName === classData.teacherName});
       console.log(newEvents);

        for(let i = 0 ; i < newEvents.length ; i++){
            console.log("checking");
            if(
                (Moment(start ,"DD/MM/YYYY").isSameOrAfter(newEvents[i].start) && 
                Moment(start ,"DD/MM/YYYY").isSameOrBefore(newEvents[i].end))||
                (Moment(end,"DD/MM/YYYY").isSameOrAfter(newEvents[i].start) && 
                Moment(end,"DD/MM/YYYY").isSameOrBefore(newEvents[i].end))) 
            {
                console.log("found");
                return false;
            }
        }
        return true;
    }
 
    const postData = async (e)=>{
        e.preventDefault();
        
        const{teacherName , batchName} = classData;
        if(!available()){
            console.log("5465465");
            return;
            // onClose();
        } 
        const res = await fetch("/addSchedule" , {
            method : "POST", 
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
            console.log("successfully submitted ");
        }

        onEventAdded({
            title,
            teacherName,
            batchName,
            start,
            end
        });

        onClose();
    }

    return (
        <Modal className="modal" isOpen ={isOpen} onRequestClose ={onClose}>
                <form method = "POST" className="form" onSubmit={postData} action="/#">
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

                    <div  style={{"marginTop": "20px" , "color":"black"}}>
                        <button className="btn" onClick={postData}>Create Schedule</button>
                    </div>
                </form>
        </Modal>
    )
}

export default AddEventModal;