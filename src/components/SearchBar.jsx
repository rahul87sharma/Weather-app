import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X, Search } from "lucide-react";

const SearchBar = ({ query, setQuery, onSearch, isLoading }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Some popular cities for suggestions
  const cities = [
    "London", "New York", "Tokyo", "Paris", "Berlin", "Sydney", "Delhi", 
    "Mumbai", "Shanghai", "Toronto", "Dubai", "Rome", "Moscow", "Amsterdam",
    "Singapore", "Bangkok", "Cairo", "Delhi", "Chicago", "Los Angeles"
  ];


  useEffect(() => {
    if (query.length > 1) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); 
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);


  const handleSuggestionClick = (city) => {
    setQuery(city);
    setShowSuggestions(false);

    const formEvent = new Event('submit', { cancelable: true });
    document.getElementById('search-form').dispatchEvent(formEvent);
  };

  return (
    <div className="w-full relative">
      <form id="search-form" onSubmit={onSearch} className="flex">
        {/* City text input */}
        <div className="relative flex-1 mr-2">
          <Input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search city..." 
            className="w-full"
            required 
            onFocus={() => query.length > 1 && setSuggestions(suggestions => suggestions.length > 0 ? suggestions : [])}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          
          {/* Suggestions dropdown */}
          {showSuggestions && (
            <div className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 shadow-md">
              {suggestions.map((city, index) => (
                <div 
                  key={index} 
                  className="px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleSuggestionClick(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Search button */}
        <Button type="submit" className="px-4">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;