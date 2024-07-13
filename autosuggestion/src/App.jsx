
import Autocomplete from './components/autocomplete'

function App() {

const fetchSuggestions = async () =>{

}

  return (
    <>
    <h1>Hello Its Shakil!!!</h1>
    <Autocomplete placeholder={"Enter Recipe"} 
      fetchSuggestions={fetchSuggestions}
    />
    </>
  )
}

export default App
