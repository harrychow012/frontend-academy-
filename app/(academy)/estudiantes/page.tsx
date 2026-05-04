import { deleteStudent, getAllStudents } from "@/actions";
import Link from "next/link";

export default async function ObtenerEstudiantes() {
  const estudiantes = await getAllStudents();

  return (
    <div className="p-8 bg-darkmin-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Gestión de Estudiantes
          </h1>
          <p className="text-white text-sm">
            Lista de estudiantes registrados en el sistema
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
          >
            ← Regresar
          </Link>

          <Link
            href="/estudiantes/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            + Crear Estudiante
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-700 text-white  uppercase">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Paterno</th>
              <th className="p-3 text-left">Materno</th>
              <th className="p-3 text-left">Dirección</th>
              <th className="p-3 text-left">Etnia</th>
              <th className="p-3 text-left">Sexo</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {estudiantes.map((est) => (
              <tr key={est.id} className="border-t">
                <td className="p-3">{est.nombre}</td>
                <td className="p-3">{est.paterno}</td>
                <td className="p-3">{est.materno}</td>
                <td className="p-3">{est.direccion}</td>
                <td className="p-3">{est.etnia?.nombre}</td>
                <td className="p-3">{est.sexo?.nombre}</td>

                <td className="p-3 flex gap-2">
                  <Link
                    href={`/estudiantes/${est.id}`}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Ver
                  </Link>

                  <Link
                    href={`/estudiantes/edit/${est.id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Link>

                  <form action={deleteStudent}>
                    <input type="hidden" name="id" value={est.id} />
                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
