import { createContext, useState, useEffect, useCallback } from "react"
import axiosInstance from "../services/axiosInstance";
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
    //all group names
    const getGroups = useCallback(async () => {
        setGroupsLoading(true);
        setGroupsError(null);
        try {
            const response = await axiosInstance.get("/api/group")
            console.log("Group response : ", response.data);
            if (response.data.success) {
                setGroups(response.data.data)
            }
            else {
                setGroupsError(response.data.error || "Failed to fetch groups")
                setGroups([]);
            }
        } catch (err) {
            const errMsg = err.response?.data?.error || "Failed to fetch groups";
            setGroupsError(errMsg)
            setGroups([]);
            console.error("Error fetching Groups:", err);
        } finally {
            setGroupsLoading(false)
        }
    }, []);

    useEffect(() => {
        getGroups();
    }, [getGroups]);






    //All notes
    const fetchNotes = useCallback(async (groupId) => {
        if (!groupId) {
            setNotes([])
            setError(null)
            return;
        }
        setloading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/api/note/group/${groupId}`)
            console.log("Notes response", response.data);
            if (response.data.success) {
                setNotes(response.data.data);
            } else {
                setError(response.data.error || "Failed to fetch notes");
                setNotes([]);
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || "Failed to fetch notes";
            setError(errMsg)
            setNotes([]);
            console.error("Error fetching notes : ", error);
        } finally {
            setloading(false)
        }

    }, []);

    //create note
    const createNote = useCallback(async (noteData) => {
        try {
            const response = await axiosInstance.post("/api/note", noteData);
            console.log("Create note response:", response.data);

            if (response.data.success) {
                await fetchNotes(selectedGroup._id);
                setNoteForm({ groupId: "", content: "" });
                return { success: true };
            } else {
                return { success: false, error: response.data.error };
            }
        } catch (err) {
            const errMsg = err.response?.data?.error || "Failed to create note";
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
                createNote

            }}>
                {
                    children
                }
            </AppDataContext.Provider>

        </>
    )
}

export default AppContext