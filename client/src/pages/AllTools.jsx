import React, { useState, useEffect } from 'react';
import { getTools, addFavorite } from '../api/api';
import { useAppContext } from '../context/AppContext';
import ToolCard from '../components/ToolCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import ConfettiEffect from '../components/ConfettiEffect';

const AllTools = () => {
  const { triggerConfetti } = useAppContext();
  const { showConfetti } = useAppContext();
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteError, setFavoriteError] = useState(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const data = await getTools();
        setTools(data);
        setFilteredTools(data);
        
        const uniqueCategories = [...new Set(data.map(tool => tool.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTools();
  }, []);

  useEffect(() => {
    let result = tools;
    
    if (selectedCategory) {
      result = result.filter(tool => 
        tool.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    if (searchTerm) {
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTools(result);
  }, [selectedCategory, searchTerm, tools]);

  const handleAddFavorite = async (toolId) => {
    try {
      setFavoriteLoading(true);
      setFavoriteError(null);
      await addFavorite(toolId);
      triggerConfetti();
    } catch (err) {
      setFavoriteError(err.message);
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-6">
      {showConfetti && <ConfettiEffect />}
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Tools Directory</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Browse and favorite the best AI tools available
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
            
            <div className="mb-6">
              <SearchBar onSearch={setSearchTerm} />
            </div>
            
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {favoriteError && <ErrorMessage message={favoriteError} />}
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedCategory ? `${selectedCategory} Tools` : 'All Tools'}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
            </span>
          </div>
          
          {filteredTools.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No tools found. Try changing your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map(tool => (
                <ToolCard 
                  key={tool.id}
                  tool={tool}
                  isFavorite={false}
                  onFavorite={handleAddFavorite}
                  loading={favoriteLoading}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTools;