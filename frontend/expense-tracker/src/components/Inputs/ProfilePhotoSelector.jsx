import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative w-28 h-28">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />
        ) : (
          <div
            className="w-28 h-28 rounded-full border flex items-center justify-center bg-slate-100 cursor-pointer"
            onClick={onChooseFile}
          >
            <LuUser size={36} className="text-gray-400" />
          </div>
        )}

        {/* Icon at bottom-right */}
        <button
          type="button"
          onClick={previewUrl ? handleRemoveImage : onChooseFile}
          className={`absolute bottom-0 right-0 p-2 rounded-full shadow-md transition-all duration-300 ${
            previewUrl ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {previewUrl ? <LuTrash size={18} /> : <LuUpload size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
