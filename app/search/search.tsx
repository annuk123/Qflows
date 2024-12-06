import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

interface Tool {
  id: string;
  name: string;
  link: string;
}

const CACHE_KEY = "searchResultsCache";

export default function Search({ isDarkMode }: { isDarkMode: boolean }) {
  const [searchValue, setSearchValue] = useState(""); 
  const [searchResults, setSearchResults] = useState<Tool[]>([]); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const inputRef = useRef<HTMLDivElement>(null); 
  const dropdownRef = useRef<HTMLUListElement>(null); 

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const cachedResults = localStorage.getItem(CACHE_KEY);
    if (cachedResults) {
      try {
        setSearchResults(JSON.parse(cachedResults) as Tool[]);
      } catch (e) {
        console.error("Failed to parse cached results:", e);
        localStorage.removeItem(CACHE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    import("@/db/tools.json")
      .then((module) => {
        const toolList = (module.default as unknown as { id: string; name: string; link: string }[]);
        const filteredData = toolList.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(filteredData);
        setShowDropdown(searchValue !== "" && filteredData.length > 0);
        localStorage.setItem(CACHE_KEY, JSON.stringify(filteredData));
      })
      .catch((e) => console.error("Failed to load tools:", e));
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (inputRef.current && dropdownRef.current) {
      dropdownRef.current.style.width = `${inputRef.current.offsetWidth}px`;
    }
  }, [showDropdown]);

  return (
    <div className="relative">
      <div
        ref={inputRef}
        className={`flex items-center w-full rounded p-1 px-2 border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600"
            : "bg-white border-gray-300"
        }`}
      >
        <FaSearch
          className={`mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-800"}`}
        />
        <input
          value={searchValue}
          onChange={handleInputChange}
          type="search"
          id="search"
          className={`grow border-none outline-none ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
          } text-sm block w-full p-1.5 px-2 placeholder-gray-400`}
          placeholder="Search"
          required
        />
      </div>
      {showDropdown && (
        <ul
          ref={dropdownRef}
          className={`absolute z-10 w-full border shadow rounded-sm ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        >
          {searchResults.map((item) => (
            <Link key={item.id} href={item.link}>
              <li
                className={`px-2 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 border-b ${
                  isDarkMode
                    ? "border-gray-600 text-white"
                    : "border-gray-300 text-black"
                }`}
              >
                <FaSearch className="mr-2" />
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
