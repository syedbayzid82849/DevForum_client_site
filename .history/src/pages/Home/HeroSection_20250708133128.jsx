import { useState } from "react";
import Banner from "../../components.";

const HeroSection = () => {
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        alert("Search functionality is not implemented yet.");
        // const res = await fetch(`https://your-api.com/search?q=${searchTerm}`);
        // const data = await res.json();
        // setResults(data);
    };

    return (
        <div>
            <Banner onSearch={handleSearch} />

            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((pet) => (
                    <div key={pet._id} className="card bg-base-100 shadow-xl">
                        <figure><img src={pet.image} alt={pet.petName} className="h-48 w-full object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{pet.petName}</h2>
                            <p>Tags: {pet.tags?.join(", ")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
