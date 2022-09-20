import React from "react";
import { useState } from "react";

const PreviewImage = ({ file }) => {
    const [preview, setPreview] = useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    };
    return <div>{preview ? <img src={preview} alt="preview" className="imgPreview" /> : "loading.."}</div>;
};

export default PreviewImage;
