import React, { useState, useContext , useRef} from 'react'


const AppContext = React.createContext();

const AppProvider = ({children}) =>{
    const [events , setEvents] = useState([]);
    const [updateModalOpen , setUpdateModalOpen] = useState(false);
    const[uid , setUid] = useState("");
    const calendarRef = useRef(null);
    const [classData , setClassData] = useState({teacherName:"" ,  batchName:""});
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());  
    const [title , setTitle] = useState("");
    const [modalOpen , setModalOpen] = useState(false);
    const[findTeacher , setFindTeacher] = useState("");

    const handleEventClick = ({ event, el }) => {
            setUpdateModalOpen(true);
            const {_def } = event;
            const {extendedProps} = _def;
            const {_id} = extendedProps;
            console.log("from context ",_id);
            setUid(_id);
            // return _id;   
    };

    const getData = async()=> {
        try{
            const res = await fetch("/getData",{
                method:"GET",
                headers:{
                    Accept : "application/json",
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setEvents(data);
            console.log(data);
        }catch(err){ 
            console.log(err);
        }
    }

    return <AppContext.Provider value={{
        events,
        updateModalOpen,
        uid,
        calendarRef,classData , 
        start,
        end,
        title,
        modalOpen,
        findTeacher,
        setStart,
        setModalOpen,
        setFindTeacher,
        setEnd ,
        setEvents,
        handleEventClick,
        setUpdateModalOpen,
        getData,
        setTitle,
        setClassData
    }}>{children}</AppContext.Provider>
}

const useGlobalContext = ()=>{
    return useContext(AppContext);
}


export {useGlobalContext , AppContext , AppProvider}