import { useEffect, useState } from "react";
//to check if it is for sale or rent, import useParams
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get a Reference
        const listingsRef = collection(db, "listings");

        //create a query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //exceute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("could  not fetch listings");
      }
    };
    fetchListings();
  }, );
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
         Offers
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
        <main>
          <ul className="categoryListings">
            {listings.map((listing) => (
              <ListingItem key={listing.id} listing={listing.data} id={listing.id} />  
            ))}
          </ul>
        </main>
        </>
      ) : (
        <p>There are no offers available at the moment, Kindly check back, Thank you</p>
      )}
    </div>
  );
}

export default Offers ;
//fetching the listing from firebase and display them here
