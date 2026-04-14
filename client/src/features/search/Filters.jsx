import React from "react";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
  });

  const handlePriceChange = (event) => {
    const value = event.target.value.split(",").map(Number);
    setFilters((prev) => ({ ...prev, priceRange: value }));
    onFilterChange({ ...filters, priceRange: value });
  };

  const handleRatingChange = (event) => {
    const value = Number(event.target.value);
    setFilters((prev) => ({ ...prev, rating: value }));
    onFilterChange({ ...filters, rating: value });
  };

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prev) => {
      const amenities = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((amenity) => amenity !== value);
      return { ...prev, amenities };
    });
    onFilterChange({ ...filters, amenities: filters.amenities });
  };

  return (
    <div className="filters">
      <h3>Filter Options</h3>
      <div className="filter-group">
        <label>Price Range:</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.priceRange.join(",")}
          onChange={handlePriceChange}
        />
      </div>
      <div className="filter-group">
        <label>Minimum Rating:</label>
        <select value={filters.rating} onChange={handleRatingChange}>
          <option value="0">Any</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Amenities:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="wifi"
              onChange={handleAmenityChange}
            />
            WiFi
          </label>
          <label>
            <input
              type="checkbox"
              value="pool"
              onChange={handleAmenityChange}
            />
            Pool
          </label>
          <label>
            <input
              type="checkbox"
              value="breakfast"
              onChange={handleAmenityChange}
            />
            Breakfast
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;