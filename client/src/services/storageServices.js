const STORAGE_KEYS = {
    GROUPS: process.env.REACT_APP_STORAGE_GROUPS_KEY,
    NOTES: process.env.REACT_APP_STORAGE_NOTES_KEY
}

// Initialize default data if empty
const initializeStorage = () => {
    if (!localStorage.getItem(STORAGE_KEYS.GROUPS)) {
        localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify([]));
    }
};

// GROUPS OPERATIONS
export const storageServices = {
    //GET ALL DATA
    getGroups: () => {
        initializeStorage();
        const groups = localStorage.getItem(STORAGE_KEYS.GROUPS);
        return groups ? JSON.parse(groups) : [];
    },
    // create a new group
    createGroup: (groupData) => {
        const groups = storageServices.getGroups();
        const groupNameExisting = groups.some(group => 
            group.name.toLowerCase() === groupData.name.toLowerCase()
        )
        if (groupNameExisting) {
            throw new Error("A group with the name already exists")
        }
        const newGroup = {
            _id: Date.now().toString(),
            ...groupData,
            createdAt: new Date().toISOString()
        }
        groups.push(newGroup);
        localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
        return newGroup;
    },
    // get all notes of a specicfic group
    getNotesByGroupId: (groupId) => {
        initializeStorage();
        const notes = localStorage.getItem(STORAGE_KEYS.NOTES);
        const allNotes = notes ? JSON.parse(notes) : [];
        return allNotes.filter(notes => notes.groupId === groupId);
    },
    //create a note
    createNote: (noteData) => {
        const notes = localStorage.getItem(STORAGE_KEYS.NOTES);
        const allNotes = notes ? JSON.parse(notes) : [];
        const newNote = {
            _id: Date.now().toString(),
            ...noteData,
            createdAt: new Date().toISOString()
        }
        allNotes.push(newNote);
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(allNotes));
        return newNote;
    }
}









