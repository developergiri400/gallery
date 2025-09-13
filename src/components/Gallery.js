import React, { useEffect, useState } from "react";
import { storage, db } from "../firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { deleteImageFromCloudinary } from "../cloudinaryService"; // We'll create this

function Gallery() {
  const [items, setItems] = useState([]);

  const handleDelete = async (itemId, publicId) => {
    try {
      // Delete from Cloudinary
      await deleteImageFromCloudinary(publicId);
      console.log('Deleted from Cloudinary');
      
      // Delete from Firestore
      await deleteDoc(doc(db, "gallery", itemId));
      console.log('Deleted from Firestore');
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
      setItems(results);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>My Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {items.map((item) => (
          <div key={item.id} style={{ position: 'relative' }}>
            {item.type === "image" ? (
              <img src={item.url} alt="" width="200" />
            ) : (
              <video src={item.url} width="200" controls />
            )}
            <button 
              onClick={() => handleDelete(item.id, item.publicId)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
