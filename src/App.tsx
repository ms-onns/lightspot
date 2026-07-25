import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Main />
    </div>
  );
}
