import React from 'react';

const ToolCard = ({ tool, isFavorite, onFavorite, onRemove, loading }) => {
  return (
    <div className="card tool-card">
      <h3>{tool.name}</h3>
      <span className="category">{tool.category}</span>
      <p className="excerpt">{tool.excerpt}</p>
      
      <div className="actions">
        <span className="pricing">{tool.pricing}</span>
        
        {isFavorite ? (
          <button 
            onClick={() => onRemove(tool.id)}
            disabled={loading}
            className="btn-remove"
          >
            Remove
          </button>
        ) : (
          <button 
            onClick={() => onFavorite(tool.id)}
            disabled={loading}
            className="btn-favorite"
          >
            ❤️ Favorite
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolCard;