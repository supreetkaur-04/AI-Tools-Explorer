import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getFavorites, removeFavorite } from '../api/api';
import ToolCard from '../components/ToolCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [removeError, setRemoveError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (toolId) => {
    try {
      setRemoveLoading(true);
      setRemoveError(null);
      await removeFavorite(toolId);
      setFavorites(favorites.filter(tool => tool.id !== toolId));
    } catch (err) {
      setRemoveError(err.message);
    } finally {
      setRemoveLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Favorites</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your saved AI tools
        </p>
      </div>
      
      {removeError && <ErrorMessage message={removeError} />}
      
      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            You haven't saved any favorites yet.
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Browse tools and click the ❤️ button to save them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(tool => (
            <ToolCard 
              key={tool.id}
              tool={tool}
              isFavorite={true}
              onRemove={handleRemoveFavorite}
              loading={removeLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;