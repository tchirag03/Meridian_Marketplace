import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Assuming you're using react-router
import axios from "axios"; // Assuming you're using axios

const StoreCard = ({ store }) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
    <img
      src={store.logoUrl}
      alt={`${store.name}`}
      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          "https://placehold.co/600x400/E2E8F0/475569?text=Image+Not+Found";
      }}
    />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-blue-700 mb-2">{store.storeName}</h3>
      <p className="text-slate-600 mb-6 min-h-[40px]">{store.description}</p>
      <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-600/50 transition-all duration-300">
        Visit Store
      </button>
    </div>
  </div>
);

// The main component to display all stores
function StoresDisplay() {
  const [urlQ] = useSearchParams(); // Destructure 'q' directly from params
  const [query, setQuery] = useState("");
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(()=>{
        setQuery(urlQ.get("q"));
    },[])
    useEffect(() => {
    
    const fetchStores = async () => {
      console.log("Searching for string:", query);
      setLoading(true);
      setError(false);
      try {
        const res = await axios.post("http://localhost:3333/store/search", {
          searchString: query,
        });
        console.log("Stores found:", res.data.stores);
        setStores(res.data.stores);
        setError(false)
      } catch (err) {
        console.error("Failed to fetch stores:", err);
        setError("Could not load stores. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [query]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center text-slate-700">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mx-auto mb-4"></div>
          <p className="text-2xl">Searching for stores...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500 text-2xl">{error}</p>;
    }

    if (stores.length <1) {
      return (
        <div className="text-center bg-yellow-100/50 border border-yellow-200 p-10 rounded-xl">
          <h2 className="text-4xl font-bold text-yellow-800 mb-2">
            No Stores Found
          </h2>
          <p className="text-yellow-700">
            We couldn't find any stores matching your search for "{query}".
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {stores.map((store , index) => (
          <StoreCard key={store._id} store={store} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 text-slate-900">
          Store Results
        </h1>
        <p className="text-center text-slate-600 text-lg mb-12">
          Showing results for:{" "}
          <span className="font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-md">
            {query}
          </span>
        </p>
        {renderContent()}
      </div>
    </div>
  );
}

export default StoresDisplay;
