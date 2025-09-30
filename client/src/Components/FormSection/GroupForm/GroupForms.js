import { useContext,useState } from "react"
import axios from 'axios';
import { AppDataContext } from "../../../Context/AppContext";
import './GroupFormStyles.css';

const GroupForm = ({onClose}) => {
  const { form, setform,getGroups } = useContext(AppDataContext)

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
  const createGroup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:4000/api/group", form)
      console.log(response)
      setform({
        name: "",
        color: ""
      })
      getGroups()
      onClose()

    } catch (error) {
      console.log("Error details:", error.response?.data);
      console.log("Form data being sent:", form);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response?.status === 409) {
        setErrorMessage("A group with this name already exists. Please choose a different name.");
      } else {
        setErrorMessage("Failed to create group. Please try again.");
      }
    }
  }
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#33F5FF', '#F5FF33'];
  return (
    <form className="group-form" onSubmit={createGroup}>
      <button 
        type="button" 
        className="close-btn" 
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <h1 className="form-title">Create a group</h1>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <label className="form-label" htmlFor=''>Group name</label>
      <input type='text'
        name='name'
        className="form-input"
        value={form.name}
        placeholder="Enter Group Name"
        onChange={updateForm}
        required></input>
      <br />
      <label className="form-label" htmlFor=''>Group color</label>
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
      <button type='submit' className="submit-btn">Create Group</button>
    </form>
  )
}

export default GroupForm