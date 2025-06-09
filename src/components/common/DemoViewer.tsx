import React, { useState } from "react";

interface DemoViewerProps {
  files: string[];
}

const DemoViewer: React.FC<DemoViewerProps> = ({ files }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!files || files.length === 0) {
    return <p className="text-sm text-gray-500">No demo files uploaded yet.</p>;
  }

  return (
    <>
      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.map((url, idx) => (
          <div
            key={idx}
            className="border rounded-lg overflow-hidden shadow-sm cursor-pointer"
            onClick={() => setSelectedImage(url)}
          >
            <img
              src={url}
              alt={`Demo ${idx + 1}`}
              className="w-full h-48 object-cover"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full px-2 py-1 text-sm shadow-md z-10"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full max-h-screen object-contain rounded-md mx-auto"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DemoViewer;
