import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Gallery from './imageComponent'

function App() {
  const [search, setSearch] = useState("");
  const [data,setData] = useState([]);
  const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
  const changeHandler = (e) => {
    setSearch(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => setData(response.data.photos.photo));
  
    }
  
  return (
    <div>
      <center>
        <h2>Image Gallery</h2>
        <h5>get your favorites images</h5>
        <form onSubmit={submitHandler}>
          <input  type="text" value={search} onChange={changeHandler} name='inputBox'/>
          <br /><br></br>
          <input type="submit" name="submit" />
          <br/>
        </form>
        {
          search === "" ? <h1>please enter some text</h1>:
          data.length>0 ? <Gallery data={data}/> : <h2>No data loaded</h2>
        }
        
      </center>

    </div>
  );
}

export default App;
