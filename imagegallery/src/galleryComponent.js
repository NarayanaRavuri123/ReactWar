import React from "react";
import './App';

const Gallery = ({ data }) => {
    return (
        <div className="images-container">
            {
                data.map((image) =>
                    <span key={image.id} >
                        <span >
                            <img className="image"
                                src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
                                height="250"
                                width="250"
                            />
                        </span>
                    </span>
                )
            }
        </div>


    )
}

export default Gallery;