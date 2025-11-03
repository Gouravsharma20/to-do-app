import { createContext, useState, useEffect, useCallback } from "react"
import { storageServices } from "../services/storageServices"
export const AppDataContext = createContext()



const AppContext = ({ children }) => {
    // get request states
    const [groups, setGroups] = useState([]);
    const [groupsLoading, setGroupsLoading] = useState(false);
    const [groupsError, setGroupsError] = useState(null);
    // post request states
    const [form, setform] = useState({
        name: "",
        color: "#B38BFA"
    });
    //about notes
    const [notes, setNotes] = useState([]);
    //loading state for notes
    const [loading, setloading] = useState(false);
    //error state for notes
    const [error, setError] = useState(null)
    const [noteForm, setNoteForm] = useState({
        groupId: "",
        content: ""
    });








    // choose selcted group
    const [selectedGroup, setSelectedGroup] = useState(null);
    const selectGroup = (group) => {
        setSelectedGroup(group);
    };
    //fetch all groups
    const getGroups = useCallback(() => {
        setGroupsLoading(true);
        setGroupsError(null);
        try {
            setTimeout(()=>{
                const groupData = storageServices.getGroups();
                setGroups(groupData)
                setGroupsLoading(false)
            },0);
        } catch (err) {
            setGroupsError("Failed to fetch groups")
            setGroups([]);
            setGroupsLoading(false);
            console.error("Error fetching Groups:", err);
        }
    }, []);  

    useEffect(() => {
        getGroups();
    }, [getGroups]);

    //creata a new group
    const createGroup = useCallback((groupData)=>{
        try {
            const newGroup = storageServices.createGroup(groupData);
            setGroups(storageServices.getGroups());
            setform({name:"",color:"#B38BFA"})
            return {success:true,data:newGroup}
            
        } catch (err) {
            const errMsg = err.message || "Failed to create group";
            console.error("Error creating Group:" ,err);
            return {success:false,error:errMsg}
            
        }
    },[])






    //fetch notes for a specific group
    const fetchNotes = useCallback((groupId) => {
        if (!groupId) {
            setNotes([])
            setError(null)
            return;
        }
        setloading(true);
        setError(null);

        try {
            setTimeout(()=>{
                const notesData = storageServices.getNotesByGroupId(groupId);
                setNotes(notesData);
                setloading(false);
            },0);
        } catch (error) {
            const errMsg = "Failed to fetch notes";
            setError(errMsg)
            setNotes([]);
            setloading(false);
            console.error("Error fetching notes : ", error);
        }
    }, []);

    //create note
    const createNote = useCallback((noteData) => {
        try {
            const newNote = storageServices.createNote(noteData);
            fetchNotes(selectedGroup._id);
            setNoteForm({groupId: "",content: ""});
            return {success:true,data:newNote}
        } catch (err) {
            const errMsg ="Failed to create note"
            console.error("Error creating note:", err);
            return { success: false, error: errMsg };
        }
    }, [fetchNotes, selectedGroup]);







    return (
        <>
            <AppDataContext.Provider value={{
                groups,
                setGroups,
                groupsLoading,
                groupsError,
                form,
                setform,
                notes,
                setNotes,
                noteForm,
                setNoteForm,
                selectedGroup,
                setSelectedGroup,
                getGroups,
                selectGroup,
                loading,
                error,
                setError,
                fetchNotes,
                createNote,
                createGroup

            }}>
                {
                    children
                }
            </AppDataContext.Provider>

        </>
    )
}

export default AppContext