import {useState, useEffect} from  "react";
import {Link,useNavigate,useParams} from "react-router-dom"
import {getDoc, doc} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {db} from "../firebase.config"
import {toast} from "react-toastify"
import Spinner from "../components/Spinner";
// import shareIcon from "../assests/svg/shareIcon.svg"
function Listing() {

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect (()=> {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", params.listingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data())
          setListing(docSnap.data());
          setLoading(false);
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching document: ", error);
      }
    }
    fetchListing();

  }, [navigate, params.listingId])
  return (
    <div>
      listing
    </div>
  )
}

export default Listing
