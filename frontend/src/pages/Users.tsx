import "../components/Post/CardPost.scss";
import { retrieveUsers } from "../clients/backendApiClient";
import CardUser from "../components/CardUser";
import UserData from "../models/UserData";

const userData: UserData[] = [];
for (let i = 1; i < 21; i++) {
  userData.push(await retrieveUsers(i));
}

export const Users = () => {
  return (
    <main>
      <h1>All users</h1>
      <section className="Section-Two">
        <div className="container PostsGallery">
          {userData.map((user) => {
            return <CardUser userData={user} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Users;
