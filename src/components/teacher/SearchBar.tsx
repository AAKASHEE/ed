import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, type: 'name' | 'usn' | 'skill') => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search by name, USN, or skill..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'usn' | 'skill'>('name');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input pl-10 pr-20 py-2 w-full"
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-24 flex items-center">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'name' | 'usn' | 'skill')}
            className="h-full border-0 bg-transparent text-gray-500 sm:text-sm focus:ring-0"
          >
            <option value="name">Name</option>
            <option value="usn">USN</option>
            <option value="skill">Skill</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;