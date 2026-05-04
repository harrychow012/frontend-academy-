import { getOneStudent } from "@/actions";
import Link from "next/link";

export default async function VerEstudiantePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const estudiante = await getOneStudent(Number((await params).id));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Detalle del Estudiante</h1>
          <p className="text-gray-400 text-sm">
            Información completa del estudiante
          </p>
        </div>

        <Link
          href="/estudiantes"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
        >
          ← Regresar
        </Link>
      </div>

      <div className="bg-gray-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-gray-400 text-sm">Nombre</p>
            <p className="text-lg font-semibold">{estudiante.nombre}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Apellido Paterno</p>
            <p className="text-lg font-semibold">{estudiante.paterno}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Apellido Materno</p>
            <p className="text-lg font-semibold">{estudiante.materno}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Dirección</p>
            <p className="text-lg font-semibold">{estudiante.direccion}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Etnia</p>
            <p className="text-lg font-semibold">
              {estudiante.etnia?.nombre ?? "No asignada"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Sexo</p>
            <p className="text-lg font-semibold">
              {estudiante.sexo?.nombre ?? "No asignado"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
