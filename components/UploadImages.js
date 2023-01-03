import React, { useEffect } from "react";

export default function UploadImages() {
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  useEffect(() => {
    if (image === null) return;
    const newImageUrl = URL.createObjectURL(image);
    setImageUrl(newImageUrl);
  }, [image]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Upload Images</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <img src={imageUrl} />
    </div>
  );
}
