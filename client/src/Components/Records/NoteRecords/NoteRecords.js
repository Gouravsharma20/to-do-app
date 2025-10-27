import {useContext, useEffect} from "react"
import { AppDataContext } from '../../../Context/AppContext';
import "./NoteRecordsStyles.css"

const NoteRecords = () => {
    const {notes,selectedGroup,loading,error,fetchNotes} = useContext(AppDataContext)
    

    useEffect(() => {
        fetchNotes(selectedGroup?._id);
    }, [selectedGroup,fetchNotes]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const isToday = date.toDateString() === today.toDateString();
        const isYesterday = date.toDateString() === yesterday.toDateString();

        const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        const day = date.getDate()
        const month = date.toLocaleString('en-US', {month: `short` });
        const year = date.getFullYear();
        const dateFormatted = `${day} ${month} ${year}`

        

        if (isToday) {
            return `Today • ${time}`;
        } else if (isYesterday) {
            return `Yesterday • ${time}`;
        } else {
            return `${dateFormatted} • ${time}`;
        }
    };

    if (loading) {
        return (
            <div className="no-notes">
                <p>Loading notes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="no-notes">
                <p>Error: {error}</p>
                <button onClick={()=>fetchNotes(selectedGroup?._id)}>Try Again</button>
            </div>
        );
    }

    if (!notes.length) {
        return (
            <div className="no-notes">
                <div></div>
            </div>
        );
    }
    return (
        <div className="note-records-container">
            {notes.map((note) => (
                <div key={note._id} className="note-item">
                    <div className="note-content">
                        {note.content}
                    </div>
                    <div className="note-timestamp">
                        {formatDate(note.createdAt)}
                    </div>
                </div>
            ))}
        </div>
    );
}








export default NoteRecords;