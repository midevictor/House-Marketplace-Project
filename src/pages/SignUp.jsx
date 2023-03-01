import { useState } from "react"
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {setDoc, doc, serverTimestamp} from "firebase/firestore"
import {db} from "../firebase.config"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visisbiltyIcon from "../assets/svg/visibilityIcon.svg"
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) =>{ 
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }) )

  }
  const onSubmit = async(e) => {
    e.preventDefault();
    const {name, email, password } = formData;
    try {
      //get auth value from getAuth
      const auth = getAuth();
      //registering the user with this function that returns a promise
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      //get the actual user info
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp()
      //updtaes the database and adds our users to the users collections
      await setDoc(doc(db, "users", user.uid), formDataCopy)

      navigate("/")
    } catch (error) {
     toast.error("Invalid registration details")
    }

  }
  const {name, email, password } = formData;
  const navigate = useNavigate(); 
  return (
   <>
   <div className="pageContainer">
    <header>
      <p className="pageHeader"> Welcome Back !</p>
    </header>

    <form onSubmit={onSubmit}>
    <input type="name" className="nameInput" placeholder="Username" id="name" value={name} onChange={onChange} />

      <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange} />
      <div className="passwordInputDiv">
        <input type={showPassword ? "text" : "password"} className="passwordInput" placeholder="Password" id="password" value = {password} onChange={onChange} />

        <img src={visisbiltyIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
      </div>

      <Link to=".forgot-password" className="forgotPasswordLink"> Forgot Password </Link>

      <div className="signUpBar">
        <p className="signUpText">Sign Up</p>
        <button className="signUpButton">
          <ArrowRightIcon width="34px" height="34px" fill="#ffffff" />
        </button>
      </div>
    </form>

    {/* Google OAuth */}
    <OAuth />
    <Link to= "/sign-in" className="registerLink"> Sign In Instead</Link>
   </div>
   
   </>
  )
}

export default SignUp
