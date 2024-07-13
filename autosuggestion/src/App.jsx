import Autocomplete from "./components/autocomplete";

function App() {
  // eslint-disable-next-line no-unused-vars
  // const staticData = [
  //   "Apple",
  //   "Mangos",
  //   "Banana",
  //   "Orange",
  //   "Melon",
  //   "Cherry",
  //   "Peach",
  //   "Plum",
  // ]
  const fetchSuggestions = async (query) => {
  const response = await fetch(
    `https://dummyjson.com/recipes/search?q=${query}`
  );
  if(!response.ok) {
    throw new Error("NetWork response was not ok ")
  }
  const result = await response.json();
  return result.recipes;

  };
 
  return (
    <>
      <h1>Autocomplete / Typeahead </h1>
      <Autocomplete
        placeholder={"Enter Recipe"}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipes.. </>}
        onSelect={(res) => console.log(res)}
        onChange={(input)=> {}}
        onBlur={(e)=> {}}
        onFocus={(e)=> {}}
        customStyles={{}}
      />
    </>
  );
}

export default App;
