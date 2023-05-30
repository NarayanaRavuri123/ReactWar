import Profile from './Profile';
import data from './Data';
import './Profile.css';

function App() {
    return (
        <section className='container'>
            {   
                data.map((eachObj) => {
                    return <Profile id={eachObj.id} url={eachObj.url} title={eachObj.title} thumbNail={eachObj.thumbnailUrl}/>
                })
            }
        </section>

    )
}

export default App;