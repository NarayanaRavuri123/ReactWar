import React from "react";
import './App';

const Gallery = ({ data }) => {
    return (
        <>
            {
                data.map((image) =>
                    <div key={image.id} className="images-container">
                        <div >
                            <img className="image"
                                src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
                                height="250"
                                width="250"
                            />
                        </div>
                    </div>
                )
            }

        </>


    )
}

export default Gallery;