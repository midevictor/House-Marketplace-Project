import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { ReactComponent as ArroRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Password Reset Link Sent");
    } catch (error) {
      toast.error("Could not reset Email");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            value={email}
            placeholder="Email"
            id="email"
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArroRightIcon fill="#ffffff" height="34px" width="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
