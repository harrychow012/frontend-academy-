import { getAllEtnias, getAllSexos } from "@/actions";
import { getAllCargos, getOneDocente, updateDocente } from "@/actions/docentes";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditarDocentePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const docenteId = Number(id);

  const docente = await getOneDocente(docenteId);
  const sexos = await getAllSexos();
  const etnias = await getAllEtnias();
  const cargos = await getAllCargos();

  async function handleUpdate(formData: FormData) {
    "use server";

    await updateDocente(docenteId, {
      nombres: String(formData.get("nombres")),
      apellidos: String(formData.get("apellidos")),
      email: String(formData.get("email")),
      direccion: String(formData.get("direccion")),
      cedula: String(formData.get("cedula")),
      telefono: String(formData.get("telefono")),
      sexo_id: Number(formData.get("sexo_id")),
      etnia_id: Number(formData.get("etnia_id")),
      cargo_id: Number(formData.get("cargo_id")),
    });

    redirect("/docentes");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Editar Docente</h1>
          <p className="text-gray-400 text-sm">
            Actualiza la información del docente
          </p>
        </div>

        <Link
          href="/docentes"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
        >
          ← Regresar
        </Link>
      </div>

      <form
        action={handleUpdate}
        className="bg-gray-800 max-w-3xl mx-auto p-6 rounded-xl shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nombres"
            defaultValue={docente.nombres}
            className="bg-gray-700 p-3 rounded outline-none"
            placeholder="Nombres"
          />

          <input
            name="apellidos"
            defaultValue={docente.apellidos}
            className="bg-gray-700 p-3 rounded outline-none"
            placeholder="Apellidos"
          />

          <input
            name="email"
            defaultValue={docente.email}
            className="bg-gray-700 p-3 rounded outline-none"
            placeholder="Email"
          />

          <input
            name="telefono"
            defaultValue={docente.telefono}
            className="bg-gray-700 p-3 rounded outline-none"
            placeholder="Teléfono"
          />

          <input
            name="cedula"
            defaultValue={docente.cedula}
            className="bg-gray-700 p-3 rounded outline-none"
            placeholder="Cédula"
          />

          <input
            name="direccion"
            defaultValue={docente.direccion}
            className="bg-gray-700 p-3 rounded outline-none"
            placeholder="Dirección"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="sexo_id"
            defaultValue={docente.sexo_id || docente.sexo?.id}
            className="bg-gray-700 p-3 rounded"
          >
            {sexos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>

          <select
            name="etnia_id"
            defaultValue={docente.etnia_id || docente.etnia?.id}
            className="bg-gray-700 p-3 rounded"
          >
            {etnias.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>

          <select
            name="cargo_id"
            defaultValue={docente.cargo_id || docente.cargo?.id}
            className="bg-gray-700 p-3 rounded"
          >
            {cargos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link
            href="/docentes"
            className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded transition"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded font-semibold transition"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}
