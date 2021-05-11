import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/userContext";
import { FirebaseContext } from "../firebase";

function UserProfile() {
  const user = useContext(DataContext);
  const firebase = useContext(FirebaseContext);
  const [userData, setuserData] = useState(null);
  const [checked, setChecked] = useState(false);

  //HANDlER
  const handleCheck = (event) => {
    event.preventDefault();
    setChecked(!event.target.checked)
    firebase.userUpdate(userData.id, { organizer: !checked });
  };

  //USEEFFECT
  useEffect(() => {
    if (user.dataUser !== undefined) {
      setuserData(user.dataUser);
    }
  }, [user,checked]);

  //VIEW

  if (userData === null) {
    return "chargement....";
  }
  const { pseudo, email, organizer } = userData;
  
  return (
    <>
      <div>Pseudo: {pseudo}</div>
      <div>Email: {email}</div>
      <div>
        <h2>Role: </h2>
        <label htmlFor="role">Devenir Organisateur</label>
        <input
          id="role"
          type="checkbox"
          checked={organizer}
          onChange={handleCheck}
        />
      </div>
    </>
  );
}

export default UserProfile;
