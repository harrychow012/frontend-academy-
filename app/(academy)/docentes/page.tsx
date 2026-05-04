import { getAllDocentes, deleteDocente } from "@/actions/docentes";
import Link from "next/link";

export default async function ObtenerDocentes() {
  const docentes = await getAllDocentes();

  return (
    <div className="p-8 bg-blend-darken min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Docentes</h1>
          <p className="text-white text-sm">
            Lista de docentes registrados en el sistema
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
            href="/docentes/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            + Crear Docente
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-700 text-white  uppercase">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Apellido</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Dirección</th>
              <th className="p-3 text-left">Cédula</th>
              <th className="p-3 text-left">Teléfono</th>
              <th className="p-3 text-left">Etnia</th>
              <th className="p-3 text-left">Sexo</th>
              <th className="p-3 text-left">Cargo</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {docentes.map((doc) => (
              <tr key={doc.id} className="border-t">
                <td className="p-3">{doc.nombres}</td>
                <td className="p-3">{doc.apellidos}</td>
                <td className="p-3">{doc.email}</td>
                <td className="p-3">{doc.direccion}</td>
                <td className="p-3">{doc.cedula}</td>
                <td className="p-3">{doc.telefono}</td>
                <td className="p-3">{doc.etnia_id}</td>
                <td className="p-3">{doc.sexo_id}</td>
                <td className="p-3">{doc.cargo_id}</td>

                <td className="p-3 flex gap-2">
                  <Link
                    href={`/docentes/${doc.id}`}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Ver
                  </Link>

                  <Link
                    href={`/docentes/edit/${doc.id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Link>

                  <form action={deleteDocente}>
                    <input type="hidden" name="id" value={doc.id} />
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
