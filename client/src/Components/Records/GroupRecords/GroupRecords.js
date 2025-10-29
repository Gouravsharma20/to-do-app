import { useContext,useEffect } from "react"
import { AppDataContext } from '../../../Context/AppContext';
import './GroupRecordsStyles.css';

const GroupRecords = ({ onGroupSelect }) => {

    const { groups, selectGroup, selectedGroup,getGroups } = useContext(AppDataContext)

    useEffect(()=>{
        getGroups();
    },[getGroups]);

    const getAbriviation = (name) => {
        const words = name.trim().split(` `).filter(words => words.length > 0);
        if (words.length === 1) {
            return words[0][0].toUpperCase();
        } else if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return ""
    }

    const handleGroupClick = (group) => {
        if (onGroupSelect) {
            // Mobile: use callback
            onGroupSelect(group);
        } else {
            // Desktop: use context directly
            selectGroup(group);
        }
    };




    return (
        <div className="group-records-container">
            {groups && groups.map((group) => (
                <div
                    key={group._id}
                    className={`group-record-item ${selectedGroup?._id === group._id ? `selected` : ``}`}
                    onClick={() => handleGroupClick(group)}>
                    

                    <div className="group-color-indicator"
                        style={{ backgroundColor: group.color }}
                    >
                        {getAbriviation(group.name)}
                    </div>
                    <div className="group-name">{group.name}</div>
                    
                </div>
            ))}
        </div>
    );
}

export default GroupRecords