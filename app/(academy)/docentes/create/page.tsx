import {
  createDocente,
  getAllCargos,
  getAllEtnias,
  getAllSexos,
} from "@/actions/docentes";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CrearDocentePage() {
  const sexos = await getAllSexos();
  const etnias = await getAllEtnias();
  const cargos = await getAllCargos();

  async function handleCreate(formData: FormData) {
    "use server";

    await createDocente({
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
          <h1 className="text-3xl font-bold">Crear Docente</h1>
          <p className="text-gray-400 text-sm">
            Completa la información del nuevo docente
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
        action={handleCreate}
        className="bg-gray-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nombres"
            placeholder="Nombres"
            className="bg-gray-700 p-3 rounded outline-none"
          />
          <input
            name="apellidos"
            placeholder="Apellidos"
            className="bg-gray-700 p-3 rounded outline-none"
          />
          <input
            name="email"
            placeholder="Email"
            className="bg-gray-700 p-3 rounded outline-none"
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            className="bg-gray-700 p-3 rounded outline-none"
          />
          <input
            name="cedula"
            placeholder="Cédula"
            className="bg-gray-700 p-3 rounded outline-none"
          />
          <input
            name="direccion"
            placeholder="Dirección"
            className="bg-gray-700 p-3 rounded outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <select name="sexo_id" className="bg-gray-700 p-3 rounded">
            {sexos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>

          <select name="etnia_id" className="bg-gray-700 p-3 rounded">
            {etnias.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>

          <select name="cargo_id" className="bg-gray-700 p-3 rounded">
            {cargos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold mt-4"
        >
          Crear Docente
        </button>
      </form>
    </div>
  );
}
