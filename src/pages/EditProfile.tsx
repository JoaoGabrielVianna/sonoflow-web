import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function EditProfile() {
  const [newUsername, setNewUsername] = useState<string>('')
  const {updateUsernameInFirestore, user} = useAuthContext();
  const navigate = useNavigate();

  const handleSave =  async()  => {
    if(!user || !newUsername) return
    await updateUsernameInFirestore(user.uid, newUsername);
    navigate('/home')
  }

  return (
    <div className="h-full w-screen  fixed top-0 left-0 z-10 flex flex-col items-center  justify-center bg-white">
      <div className="flex flex-col space-y-3 ">
       <Link to={'/settings'}> <ArrowLeft/></Link>
        <h1 className="font-bold ">Edit Profile</h1>
        <div>
          <p>Username</p>
          <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} type="text" className="border border-gray-500 p-2 rounded-lg" />
        </div>
        <button className="bg-sunshine font-bold rounded-lg  " onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditProfile;