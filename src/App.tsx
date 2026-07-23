import Header from "./components/Header";
import Main from "./components/Main";
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header /> 
      <Main />
    </div>
  );
}
