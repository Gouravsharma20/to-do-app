import { useContext, useState } from 'react'
import axios from 'axios'
import "./NoteFormStyles.css";
import { AppDataContext } from '../../../Context/AppContext';

const NoteForm = () => {
  const {noteForm, setNoteForm, selectedGroup, fetchNotes} = useContext(AppDataContext)
  const [isLoading, setIsLoading] = useState(false)

  const updateNoteForm = (e) => {
    const {name, value} = e.target;
    setNoteForm({
      ...noteForm,
      [name]: value
    })
  }

  const createNote = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const NoteData = {
        groupId: selectedGroup._id,
        content: noteForm.content
      };
      const response = await axios.post("http://localhost:4000/api/note", NoteData)
      console.log(response)
      setNoteForm({
        groupId: "",
        content: ""
      });
      fetchNotes(selectedGroup?._id)
    } catch(error) {
      console.log("Error creating note:", error.response?.data);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='note-form' onSubmit={createNote}>
      <h1 className='form-title'>add note to {selectedGroup?.name}</h1>
      <label className='form-label'>Note Content</label>
      <div className='form-textarea-wrapper'>
        <textarea
          name='content'
          className='form-textarea'
          placeholder='Type your note here...'
          value={noteForm.content}
          onChange={updateNoteForm}
          rows={4}
          required
        />
        <button 
          type='submit' 
          className={`send-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading || !noteForm.content.trim()}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  )
}

export default NoteForm;