import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Samplepage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const userRef = collection(db, "user");
        const q = query(userRef, where("name", "==", "bretz"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setName(userData.name);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching name:", error);
        setLoading(false);
      }
    };

    fetchName();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-green">
      <h1 className="text-5xl font-bold mb-4 text-cyan-400">
        Tailwind Test ✅
      </h1>
      <p className="text-lg text-gray-300">
        If you see this styled text, Tailwind CSS is working!
      </p>
      {loading ? (
        <p className="text-lg text-yellow-400 mt-4">Loading...</p>
      ) : (
        <p className="text-2xl text-green-400 mt-4">Name: {name}</p>
      )}
      <button className="mt-6 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
        Click Me
      </button>
    </div>
  );
}

export default Samplepage;
