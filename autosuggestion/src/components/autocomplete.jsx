/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import SuggestionList from "./suggestions-list";
import debounce from "lodash/debounce"
const Autocomplete = ({
  staticData,
  fetchSuggestions,
  placeholder = "",
  customLoading = "Loading..",
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
  dataKey = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(suggestions);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
    suggestions([])
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  const getSuggestionsDebounced = useCallback(debounce(getSuggestions,300),[]);
  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) =>{
  setInputValue(dataKey ? suggestion[dataKey]: dataKey)
  onSelect(suggestion)
  }

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list ">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionList 
          dataKey={dataKey}
          highlight={inputValue}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
