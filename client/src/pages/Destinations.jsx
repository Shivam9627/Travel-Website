import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { fetchDestinations } from '../api/destinations';
import { searchDestinations } from '../api/search';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../features/search/SearchBar';
import { formatCurrency } from '../utils/currency';
import './Destinations.css';

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState(initialQ);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchingAI, setSearchingAI] = useState(false);

  const regions = ['all', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'];

  useEffect(() => {
    fetchDestinations()
      .then(setList)
      .catch((e) => {
        console.error('Fetch error:', e);
        setErr(`Connection Error: Make sure your server is running on http://localhost:5000`);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle AI search when pressed Enter or button clicked
  const handleAISearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setSearchingAI(true);
    try {
      const result = await searchDestinations(searchQuery);
      if (result.results && result.results.length > 0) {
        // Add AI results to the list
        const aiResults = result.results.map((dest, idx) => {
          const isAIGenerated = result.source !== 'database';
          const destId = isAIGenerated ? `ai-${Date.now()}-${idx}` : (dest._id || dest.id);
          // Cache AI-generated destination data in localStorage for later retrieval
          if (isAIGenerated) {
            const cacheKey = `__dest_${destId}`;
            localStorage.setItem(cacheKey, JSON.stringify(dest));
          }
          return {
            ...dest,
            _id: destId,
            aiGenerated: isAIGenerated,
            source: result.source,
          };
        });
        
        setList((prev) => [...prev, ...aiResults]);
      }
    } catch (error) {
      console.error('AI search error:', error);
      setErr(`Failed to search with AI. Please try again.`);
    } finally {
      setSearchingAI(false);
    }
  };

  // Enhanced filter with search functionality
  const filtered = useMemo(() => {
    let result = list;

    const s = q.trim().toLowerCase();
    if (s) {
      result = result.filter((d) =>
        `${d.name} ${d.country || ''} ${d.description || ''} ${d.region || ''} ${d.tag || ''}`.toLowerCase().includes(s)
      );
    }

    result = result.filter((d) => (d.price ?? 0) <= maxPrice);
    result = result.filter((d) => (d.rating ?? 0) >= minRating);

    if (selectedRegion !== 'all') {
      result = result.filter((d) => (d.region || '').toLowerCase() === selectedRegion.toLowerCase());
    }

    return result;
  }, [list, q, maxPrice, minRating, selectedRegion]);

  return (
    <div className="destinations-page">
      <section className="destinations-hero">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore the World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Find your next favorite destination from our curated collection or search for any place.
          </motion.p>
        </div>
      </section>

      <div className="container">
        <div className="destinations-layout">
          <aside className="filters-sidebar">
            <div className="filter-card">
              <h3>Filters</h3>
              
              <div className="filter-group">
                <label>Search</label>
                <div className="filter-search-wrap">
                  <SearchBar value={q} onChange={setQ} placeholder="Where to?" />
                  <button 
                    className="btn-filter-search" 
                    aria-label="Search"
                    onClick={() => handleAISearch(q)}
                    disabled={searchingAI}
                    title={searchingAI ? 'Searching...' : 'Search including AI destinations'}
                  >
                    {searchingAI ? '⏳' : '🔍'}
                  </button>
                </div>
                {searchingAI && <p style={{fontSize: '0.8em', color: '#666', marginTop: '5px'}}>Searching AI destinations...</p>}
              </div>

              <div className="filter-group">
                <label>Max Price: <span>{formatCurrency(maxPrice)}</span></label>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="range-input"
                />
              </div>

              <div className="filter-group">
                <label>Min Rating: <span>{minRating > 0 ? `${minRating}★` : 'Any'}</span></label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="range-input"
                />
              </div>

              <div className="filter-group">
                <label>Region</label>
                <div className="region-chips">
                  {regions.map((region) => (
                    <button
                      key={region}
                      className={`region-chip ${selectedRegion === region ? 'active' : ''}`}
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="destinations-main">
            {loading ? (
              <div className="loading-grid">
                {[1, 2, 3, 4].map(i => <div key={i} className="skeleton-card"></div>)}
              </div>
            ) : err ? (
              <div className="error-box">{err}</div>
            ) : (
              <>
                <div className="results-count">
                  Showing {filtered.length} destinations {filtered.some(d => d.aiGenerated) && '(includes AI-generated)'}
                </div>
                
                <motion.div 
                  className="destinations-grid"
                  layout
                >
                  <AnimatePresence>
                    {filtered.map((dest) => (
                      <motion.div
                        key={dest._id || dest.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <DestinationCard destination={dest} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                  <div className="no-results">
                    <p>No destinations match your filters. Try clearing them or search with AI!</p>
                    <button onClick={() => {setQ(''); setMaxPrice(200000); setMinRating(0); setSelectedRegion('all');}}>
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
