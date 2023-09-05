import "./Posts.scss";

interface PostData {
  imageUrl: string;
  species: string;
  username: string;
  sightingDate: string;
}

const postData: PostData[] = [
  {
    imageUrl: "string",
    species: "humpback",
    username: "Ariel",
    sightingDate: "04 September 2023",
  },
  {
    imageUrl: "string",
    username: "Ariel",
    species: "humpback",
    sightingDate: "04 September 2023",
  },
  {
    imageUrl: "string",
    username: "Nemo",
    species: "humpback",
    sightingDate: "03 September 2023",
  },
  {
    imageUrl: "string",
    username: "Aquaman",
    species: "humpback",
    sightingDate: "02 September 2023",
  },
  {
    imageUrl: "string",
    username: "Ariel",
    species: "humpback",
    sightingDate: "28 August 2023",
  },
  {
    imageUrl: "string",
    username: "Ariel",
    species: "humpback",
    sightingDate: "28 August 2023",
  },
  {
    imageUrl: "string",
    username: "Nemo",
    species: "humpback",
    sightingDate: "28 August 2023",
  },
  {
    imageUrl: "string",
    username: "Aquaman",
    species: "humpback",
    sightingDate: "28 August 2023",
  },
];

export const Posts = () => {
  return (
    <main>
      <h1>Whale Spotting Posts</h1>
      <section className="Section-One">
        <div className="section-content">
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

      <section className="Section-Two">
        <div className="section-content ProjectsGallery">
          {postData.map((post) => {
            return (
              <div className="Post">
                <div className="Post__image"></div>
                <div className="Post__info">
                  <p className="Post__title">{post.species}</p>
                  <p className="Post__text">{post.username}</p>
                  <p className="Post__text">{post.sightingDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Posts;
