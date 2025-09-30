import {createContext, useState,useEffect,useCallback } from "react"
import axios from 'axios';
export const AppDataContext = createContext()



const AppContext = ({ children }) => {
    // get request states
    const [groups, setGroups] = useState(null);
    // post request states
    const [form, setform] = useState({
        name: "",
        color: "#ffffff"
    });
    //about notes
    const [notes, setNotes] = useState([]);
    //loading state for notes
    const [loading,setloading] = useState(false);
    //error state for notes
    const [error,setError] = useState(null)
    const [noteForm, setNoteForm] = useState({
    groupId: "",
    content: ""
  });








    // choose selcted group
    const [selectedGroup, setSelectedGroup] = useState(null);
    const selectGroup = (group) => {
        setSelectedGroup(group);
    };
    //all group names
    const getGroups = async () => {
            const allGroups = await axios.get("http://localhost:4000/api/group")
            const data = allGroups.data
            setGroups(data)
        }
        useEffect(() => {
        getGroups();
    }, []);






    //All notes
    const fetchNotes = useCallback(async (groupId) => {
        if (!groupId) {
            setNotes([])
            return;
        }
        setloading(true);
        setError(null);

        try {
            // Fetch notes for the selected group
            const response = await axios.get(`http://localhost:4000/api/note/group/${groupId}`)
            const data = response.data
            setNotes(data)
        } catch (error) {
            console.log("Error fetching notes", error);
            setError("Failed to fetch notes")
            setNotes([]);
        } finally {
            // Set loading to false after API call completes
            setloading(false)
        }

    },[])
   




    
    
    return (
        <>
            <AppDataContext.Provider value={{
                groups,
                setGroups,
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
                fetchNotes,
            }}>
                {
                    children
                }
            </AppDataContext.Provider>

        </>
    )
}

export default AppContext