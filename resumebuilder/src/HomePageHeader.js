import Movie from './MovieComponent';
import './Movie.css';


const MovieArr = [
  {
    imageURL: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/enjoyOnTv/en.png",
    alternateText: "Peaky blenders"
  },
  {
    imageURL: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/watchEverywhere/en.png",
    alternateText: "Bridger ton "
  },
  {
    imageURL: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/kids/en-GB.png",
    alternateText: "Children"
  },
  {
    imageURL: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/download/en.png",
    alternateText: "Stranger Things"
  }

];

function App() {


  return (
    <section className='container'>

      <Movie imageURL={MovieArr[0].imageURL} alernate={MovieArr[0].alternateText} />
      <Movie imageURL={MovieArr[1].imageURL} alernate={MovieArr[1].alternateText} />
      <Movie imageURL={MovieArr[2].imageURL} alernate={MovieArr[2].alternateText} />
      <Movie imageURL={MovieArr[3].imageURL} alernate={MovieArr[3].alternateText} />


    </section>

  );


}



export default App;
