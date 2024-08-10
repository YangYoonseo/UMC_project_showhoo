// import axios from "axios";
// import { useEffect, useState } from "react";

// function ProfileRegistration() {
//   const [profile, setProfile] = useState([]);

//   useEffect(() => {
//     const apiUrl =
//       "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/v3/api-docs";

//     axios
//       .get(apiUrl)
//       .then((res) => {
//         setProfile(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => {
//         alert(err.response.data.message);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>목록</h1>
//       <ul>
//         {profile.map((item) => (
//           <li key={item.id}>{item.text}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProfileRegistration;
