import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function SpotPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Деталі закладу</h1>
      <p className="mb-6 text-xl text-gray-600">
        ID закладу: <span className="font-bold text-yellow-600">{id}</span>
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        <ArrowLeft className="w-5 h-5" />
        Повернутися на головну
      </Link>
    </div>
  );
}
