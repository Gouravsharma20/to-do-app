import { useContext, useState } from 'react'
import "./NoteFormStyles.css";
import { AppDataContext } from '../../../Context/AppContext';
import axiosInstance from '../../../services/axiosInstance';
import vector from '../../../assets/vector.png';

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
      const response = await axiosInstance.post("/api/note", NoteData)
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
      <div className='form-textarea-wrapper'>
        <textarea
          name='content'
          className='form-textarea'
          placeholder='Enter your text here........... '
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
          <img src={vector} alt=''/>
        </button>
      </div>
    </form>
  )
}

export default NoteForm;