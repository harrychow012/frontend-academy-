import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-10">Dashboard</h1>

        <p className="text-center text-gray-400 mb-10">
          Sistema de gestión de estudiantes y docentes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/estudiantes"
            className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-8 shadow-lg text-center"
          >
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">
              Estudiantes
            </h2>
            <p className="text-gray-400">Gestiona registros de estudiantes</p>
          </Link>

          <Link
            href="/docentes"
            className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-8 shadow-lg text-center"
          >
            <h2 className="text-2xl font-semibold text-green-400 mb-2">
              Docentes
            </h2>
            <p className="text-gray-400">Administra información de docentes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
