import SearchBar from "./components/SearchBar";
import VideoPlayer from "./components/VideoPlayer";
import "./main.css"
import ModalWindow from "./components/ModalWindow";

function App() {
  return (
    <div className="App">
        <ModalWindow/>
        <SearchBar/>
        <VideoPlayer/>
    </div>
  );
}

export default App;
