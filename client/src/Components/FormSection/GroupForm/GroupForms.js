import { useContext,useState } from "react"
import { AppDataContext } from "../../../Context/AppContext";
import './GroupFormStyles.css';
import axiosInstance from "../../../services/axiosInstance";

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
      const response = await axiosInstance.post("/api/group", form)
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
  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
  return (
    <form className="group-form" onSubmit={createGroup}>
      <h1 className="form-title">Create New group</h1>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <div className="group-name">
        <label className="form-label" htmlFor=''>Group Name</label>
      <input type='text'
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