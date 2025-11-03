import { useContext, useState } from 'react'
import "./NoteFormStyles.css";
import { AppDataContext } from '../../../Context/AppContext';
import vector from '../../../assets/vector.png';

const NoteForm = () => {
  const {noteForm, setNoteForm, selectedGroup, createNote} = useContext(AppDataContext)
  const [isLoading, setIsLoading] = useState(false)

  const updateNoteForm = (e) => {
    const {name, value} = e.target;
    setNoteForm({
      ...noteForm,
      [name]: value
    })
  }

  const handlecreateNote = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const NoteData = {
        groupId: selectedGroup._id,
        content: noteForm.content
      };
      const result = createNote(NoteData)
      if (result.success) {
        setNoteForm({
          groupId: "",
          content: ""
        }); 
      }else{
          console.error("Error creating note:",result.error);
        }
    } catch(error) {
      console.error("Error creating note:", error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='note-form' onSubmit={handlecreateNote}>
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