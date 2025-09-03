import React, { useEffect, useState } from "react";
import { storage, db } from "../firebase";  // Ensure this matches
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => results.push(doc.data()));
      setItems(results);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>My Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {items.map((item, idx) =>
          item.type === "image" ? (
            <img key={idx} src={item.url} alt="" width="200" />
          ) : (
            <video key={idx} src={item.url} width="200" controls />
          )
        )}
      </div>
    </div>
  );
}

export default Gallery;
