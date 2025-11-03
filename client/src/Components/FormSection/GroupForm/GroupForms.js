import { useContext,useState } from "react"
import { AppDataContext } from "../../../Context/AppContext";
import './GroupFormStyles.css';

const GroupForm = ({onClose}) => {
  const { form, setform,createGroup } = useContext(AppDataContext)

  const [errorMessage, setErrorMessage] = useState("");

  const updateForm = (e) => {
    const { name, value } = e.target;

    setform({
      ...form,
      [name]: value
    });
    if (errorMessage) {
      setErrorMessage("");
    }
  }
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if(!form.name.trim) {
      setErrorMessage("Group name cannot be empty");
      return
    }
    try {
      const result = createGroup(form);
      if (result.success) {
        setform({
          name:"",
          color:"#B38BFA"
        })
        onClose()
      } else {
        setErrorMessage(result.error ||"Failed to create group");
      }
    }catch(error) {
      console.log("Error creating group:", error)
      setErrorMessage("Failed to create group. Please try again.");
    }
  }
  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
  return (
    <form className="group-form" onSubmit={handleCreateGroup}>
      <h1 className="form-title">Create New group</h1>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <div className="group-name">
        <label className="form-label" htmlFor=''>Group Name</label>
      <input type='text'
        id="groupName"
        name='name'
        className="form-input"
        value={form.name}
        placeholder="Enter Group Name"
        onChange={updateForm}
        required></input>
      </div>
      
      <br />
      <div className="choose-color">
        <label className="form-label" htmlFor=''>Choose colour</label>
      <div className="color-options">
        {colors.map(color => (
          <label key={color} className="color-label">
            <input
              type='radio'
              className="color-radio"
              name='color'
              value={color}
              checked={form.color === color}
              onChange={updateForm}
              
            />
            <span
              className="color-circle"
              style={{backgroundColor:color}}
              >
              </span>
          </label>
        ))}
      </div> 
      </div>
      <div className="button-container">
        <button type='submit' className="submit-btn">Create</button>
      </div>
      
    </form>
  )
}

export default GroupForm