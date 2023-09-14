// import { useParams } from "react-router-dom";
// import { useCallback, useEffect, useState } from "react";
// import PostsData from "../models/PostsData";
// import WhaleLoader from "../components/UI/WhaleLoader";
// import Button from "../components/UI/Button";
// import { BodyOfWater } from "../models/BodyOfWater";
// import { getBodyOfWaterByName } from "../clients/backendApiClient";
// import CardPost from "../components/Post/CardPost";

// export const SearchResult = () => {
//   const [bodyOfWater, setBodyOfWater] = useState<BodyOfWater>();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [notFound, setNotFound] = useState<boolean>(false);
//   const [otherError, setOtherError] = useState<boolean>(false);

//   const { bodyOfWaterName } = useParams<{ bodyOfWaterName: string }>();

//   const fetchSearchResults = useCallback(async () => {
//     setNotFound(false);
//     setOtherError(false);
//     setBodyOfWater(undefined);

//     if (bodyOfWaterName) {
//       setLoading(true);
//       await getBodyOfWaterByName(bodyOfWaterName)
//         .then((response) => {
//           if (response.ok) {
//             response.json().then(setBodyOfWater);
//           } else {
//             setNotFound(true);
//           }
//         })
//         .catch(() => {
//           setOtherError(true);
//         });
//         setLoading(false);
//     } else {
//       setNotFound(true);
//       setLoading(false);
//     }
//   }, [bodyOfWaterName]);

//   useEffect(() => {
//     fetchSearchResults();
//   }, [fetchSearchResults]);

//   if (loading || notFound || otherError) {
//     return (
//       <main>
//         <section className="section-dark">
//           <div className="container Posts__loader">
//             <WhaleLoader
//               isLoading={loading}
//               message={
//                 loading
//                   ? "Loading..."
//                   : notFound
//                   ? "That body of water doesn't seem to exist."
//                   : "Couldn't fetch posts at this time."
//               }
//             />
//             {otherError && <Button onClick={fetchSearchResults}>Try Again</Button>}
//           </div>
//         </section>
//       </main>
//     )
//   }

//   return (
//     <div>
//       <h2>Posts for {bodyOfWaterName}</h2>
//       <div>
//       </div>
//     </div>
//   )
// }
