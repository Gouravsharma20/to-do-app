import { useContext, useState } from 'react'
import GroupRecords from '../../Components/Records/GroupRecords/GroupRecords'
import GroupForm from '../../Components/FormSection/GroupForm/GroupForms'
import NoteForm from '../../Components/FormSection/NoteForm/NoteForms'
import NoteRecords from '../../Components/Records/NoteRecords/NoteRecords'
import "./HomeStyles.css"
import { AppDataContext } from '../../Context/AppContext'


const Home = () => {
  const { selectedGroup, selectGroup } = useContext(AppDataContext);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showMobileNotes, setShowMobileNotes] = useState(false);

  // Handle group selection for mobile
  const handleGroupSelect = (group) => {
    selectGroup(group);
    setShowMobileNotes(true);
  };

  // Handle back button for mobile
  const handleBackToGroups = () => {
    setShowMobileNotes(false);
    selectGroup(null);
  };


  return (
    <section className='home-section'>
      <div className={`sidebar ${showMobileNotes ? 'hide-on-mobile' : ''}`}>
        <div className='sidebar-header'>
          <h1>Pocket Notes</h1>
        </div>
        <div className='groups-section'>
          <GroupRecords onGroupSelect={handleGroupSelect} />
          <button
            className='add-group-btn'
            onClick={()=>setShowGroupForm(true)}
          >
            +
          </button>
        </div>
      </div>

      <div className={`main-content ${showMobileNotes ? 'show-on-mobile' : ''}`}>
        {!selectedGroup ? (
          <div className="welcome-screen">
            <div className="welcome-content">
              <div className="welcome-illustration">
                {/* You can add an illustration/image here */}
                <div className="notes-icon">📝</div>
              </div>
              <h2>Pocket Notes</h2>
              <p>
                Send and receive messages without keeping your phone online.<br/>
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <div className="encryption-notice">
              🔒 end-to-end encrypted
            </div>
          </div>
        ) : (
          <div className="selected-group-section">
            <div className="group-header">
              <button
                className="back-btn"
                onClick={handleBackToGroups}
                aria-label="Back to groups"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <div 
                className="group-avatar"
                style={{backgroundColor: selectedGroup.color}}
              >
                {selectedGroup.name.trim().split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <h2>{selectedGroup.name}</h2>
            </div>
            
            <div className="notes-display">
              <NoteRecords />
            </div>
            
            <div className="note-input-section">
              <NoteForm />
            </div>
          </div>
        )}
      </div>

      {showGroupForm && (
        <div className="modal-overlay" onClick={() => setShowGroupForm(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <GroupForm onClose={() => setShowGroupForm(false)} />
          </div>
        </div>
      )}
    </section>
  )
}

export default Home