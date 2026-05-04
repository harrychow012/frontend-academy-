import { getOneDocente } from "@/actions/docentes";
import Link from "next/link";

export default async function VerDocentePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const docente = await getOneDocente(Number((await params).id));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Detalle del Docente</h1>
          <p className="text-gray-400 text-sm">
            Información completa del docente seleccionado
          </p>
        </div>

        <Link
          href="/docentes"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
        >
          ← Regresar
        </Link>
      </div>

      <div className="bg-gray-800 shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Nombre</p>
            <p className="text-lg font-semibold">{docente.nombres}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Apellido</p>
            <p className="text-lg font-semibold">{docente.apellidos}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Dirección</p>
            <p className="text-lg font-semibold">{docente.direccion}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Cédula</p>
            <p className="text-lg font-semibold">{docente.cedula}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Teléfono</p>
            <p className="text-lg font-semibold">{docente.telefono}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Etnia</p>
            <p className="text-lg font-semibold">
              {docente.etnia?.nombre ?? "No asignada"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Sexo</p>
            <p className="text-lg font-semibold">
              {docente.sexo?.nombre ?? "No asignado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
