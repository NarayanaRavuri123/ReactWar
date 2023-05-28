import './Movie.css';
import { Button } from '@mui/material';

const Movie = (Props) => {

    return (
        <div className="MovieContainer">
            <img src={Props.imageURL} alt={Props.alernate} />
            <Button variant='contained' onClick={()=>{window.print()}}>{Props.alernate}</Button>


        </div>
    );
}

export default Movie;