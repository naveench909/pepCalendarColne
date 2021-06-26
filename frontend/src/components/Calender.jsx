import React, { useState ,  useEffect} from "react";
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import AddEventModal from "./AddEventModal";
import UpdateEventModal from "./updateEventModal";
import moment from "moment"
import { useGlobalContext } from "../context";

const Calendar = ()=> {
    const{events,setEvents,handleEventClick,setUpdateModalOpen,updateModalOpen,calendarRef,getData,setStart,setEnd,modalOpen,setModalOpen,findTeacher,setFindTeacher} = useGlobalContext();

    const onEventAdded = event =>{
        let calendarApi = calendarRef.current.getApi();
        let task = event.teacherName + "( " + event.batchName + " )";
        calendarApi.addEvent({
            start : moment(event.start).toDate(),
            end : moment(event.end).toDate(),
            teacherName : event.teacherName,
            batchName : event.batchName,
            title : task
        });
    } 

    const onUpdateEventAdded = event => {
        return onEventAdded(event);
    }   

    const getTeacherSchedule = (e,teacher)=>{
        e.preventDefault();
        let newEvents = [];
        if(teacher !== ""){
            newEvents = events.filter((task)=>{ return task.teacherName === teacher})              
        }else{
            getData();
        }
        setEvents(newEvents);
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <section>
            <div style={{"marginLeft":"auto" , "marginRight":"auto" , "width" : "300px" , "textAlign" : "center" , "fontSize" : "40px"}}>
                Class Scheduler
                <div className="underline"></div>
            </div>
            <div style ={{position:"relative" , zIndex : 0}}>
                <div>
                    <form onSubmit={(e)=>getTeacherSchedule(e,findTeacher)}>
                        <label style={{"fontSize":"20px"}}>Find Schedule : </label>
                        <input style={{"height" : "20px" , "paddingLeft":"5px" , "marginBottom":"10px"}} type="text" placeholder="Teacher Name" 
                        value={findTeacher} 
                        onChange={(e)=>setFindTeacher(e.target.value)}/>
                        <button style={{"height" : "25px" , "paddingLeft":"5px" , "marginBottom":"10px"}} onClick={(e)=>{getTeacherSchedule(e,findTeacher)}}>Search</button>
                    </form>
                </div>
                <FullCalendar
                    plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ,interactionPlugin ]}
                    ref ={calendarRef}
                    events={events} 
                    initialView="dayGridMonth"
                    initialDate= '2021-06-07'
                    editable={true}
                    selectable={true}
                    selectHelper={true}
                    eventClick={handleEventClick}
                    headerToolbar= {{
                        left: 'prev,next today CreateTask',
                        center: 'title',
                        right: 'dayGridMonth timeGridWeek timeGridDay listWeek'
                    }}
                    customButtons={{
                            CreateTask : {
                                text : "Add Task",
                                click : function(){
                                    setModalOpen(true);
                                }
                            }
                    }}

                    select={function(info){
                        setModalOpen(true);
                        const{start , end} = info;
                        setStart(start);
                        setEnd(end);
                    }}
                    
                />
            </div>

            <AddEventModal 
                isOpen={modalOpen}
                onClose={()=>setModalOpen(false)} 
                onEventAdded={(event) => onEventAdded(event)}
            />

            <UpdateEventModal 
                isUpdateOpen={updateModalOpen}
                onUpdateClose={()=>setUpdateModalOpen(false)} 
                onUpdateEventAdded={(event) => onUpdateEventAdded(event)}
            />
            
        </section>
    )
}

export default Calendar;