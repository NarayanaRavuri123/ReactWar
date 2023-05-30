import { Button } from "@mui/material";
import './Profile.css';
const Profile = (Props) => {
    return (
        <section className="profile">
            <img className="profileImg" src={Props.url} alt="Random text"></img>
            <p>{Props.title}</p>
            <Button variant=" "><a href={Props.thumbnailUrl}>T</a></Button>
        </section>
    )
}   

export default Profile;