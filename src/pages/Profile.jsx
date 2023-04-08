import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import {toast} from 'react-toastify'
import { useNavigate, Link } from "react-router-dom";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg"
import homeIcon from "../assets/svg/homeIcon.svg"

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();
  const onLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    navigate("/sign-in");
  };
  const { name, email } = formData;
  const onSubmit = async () => {
    try{
      if(auth.currentUser.displayName !== name){
        //update dispaly name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name, 
        })
        // update in firestore
        const userRef = doc(db, "users",auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name,
        })
      }

    }catch(error){ 
      toast.error("Could not update profile details")

    }
    // updateProfile(auth.currentUser, {
    //   displayName: name,
    // }).then(() => {
    //   updateDoc(doc(db, "users", auth.currentUser.uid), {
    //     name: name,
    //     email: email,
    //   })
    // })
  };
  const onChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profleDetailsText">Personal Details </p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form action="">
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />

             <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
      </main>
    </div>
  );
}

export default Profile;
