import "./Posts.scss";
import { retrieveUsers } from "../clients/backendApiClient";

export interface UserData {
  id: number;
  username: string;
  email: string;
  name: string;
  profileImageUrl: string;
}

const userData: UserData[] = [];
for (let i = 0; i < 20; i++) {
  userData.push(await retrieveUsers(i));
}

export const Users = () => {
  return (
    <main>
      <h1>All users</h1>
      <section className="section-dark">
        <div className="container">
          <h2>The Whale</h2>
          <p>
            Whales are a widely distributed and diverse group of fully aquatic
            placental marine mammals. As an informal and colloquial grouping,
            they correspond to large members of the infraorder Cetacea, i.e. all
            cetaceans apart from dolphins and porpoises. Dolphins and porpoises
            may be considered whales from a formal, cladistic perspective.
            Whales, dolphins and porpoises belong to the order Cetartiodactyla,
            which consists of even-toed ungulates. Their closest non-cetacean
            living relatives are the hippopotamuses, from which they and other
            cetaceans diverged about 54 million years ago. The two parvorders of
            whales, baleen whales (Mysticeti) and toothed whales (Odontoceti),
            are thought to have had their last common ancestor around 34 million
            years ago. Mysticetes include four extant (living) families:
            Balaenopteridae (the rorquals), Balaenidae (right whales),
            Cetotheriidae (the pygmy right whale), and Eschrichtiidae (the grey
            whale). Odontocetes include the Monodontidae (belugas and narwhals),
            Physeteridae (the sperm whale), Kogiidae (the dwarf and pygmy sperm
            whale), and Ziphiidae (the beaked whales), as well as the six
            families of dolphins and porpoises which are not considered whales
            in the informal sense.{" "}
          </p>
        </div>
      </section>

      <section className="Section-Two"></section>
    </main>
  );
};

export default Users;
