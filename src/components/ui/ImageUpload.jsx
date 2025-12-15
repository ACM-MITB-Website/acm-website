import React, { useCallback, useState } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onUpload, folder = 'images', customName, className = "" }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const processFile = async (file) => {
        if (!file || !file.type.startsWith('image/')) {
            setError("Please upload an image file.");
            return;
        }

        setError(null);
        setUploading(true);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);

        try {
            // Naming convention: folder/customName.ext OR folder/timestamp_filename
            const extension = file.name.split('.').pop();
            const fileName = customName
                ? `${customName}.${extension}`
                : `${Date.now()}_${file.name}`;

            const fullPath = `${folder}/${fileName}`;
            const storageRef = ref(storage, fullPath);

            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            onUpload(downloadURL);
            setUploading(false);
        } catch (err) {
            console.error("Upload failed:", err);
            setError("Upload failed. Please try again.");
            setUploading(false);
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const clearImage = (e) => {
        e.stopPropagation(); // Prevent triggering click on input label
        setPreview(null);
        onUpload('');
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="file"
                id={`image-upload-${folder}`}
                className="hidden"
                accept="image/*"
                onChange={handleChange}
                disabled={uploading}
            />

            <label
                htmlFor={`image-upload-${folder}`}
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 overflow-hidden group
                    ${dragActive ? 'border-acm-teal bg-acm-teal/10' : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40'}
                    ${error ? 'border-red-500/50 bg-red-500/5' : ''}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {uploading ? (
                    <div className="flex flex-col items-center text-acm-teal">
                        <Loader2 className="animate-spin mb-2" size={24} />
                        <span className="text-xs font-mono">UPLOADING...</span>
                    </div>
                ) : preview ? (
                    <div className="relative w-full h-full">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={clearImage}
                                className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                                type="button"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="absolute bottom-2 right-2 p-1 bg-black/60 rounded-full">
                            <Check size={12} className="text-green-400" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-gray-400 group-hover:text-white transition-colors p-4 text-center">
                        <Upload size={24} className="mb-2" />
                        <span className="text-sm font-medium">Click or Drag Image</span>
                        <span className="textxs text-gray-500 mt-1">Has to clearly be an image</span>
                    </div>
                )}
            </label>

            {error && (
                <p className="text-red-400 text-xs mt-1 text-center">{error}</p>
            )}
        </div>
    );
};

export default ImageUpload;
