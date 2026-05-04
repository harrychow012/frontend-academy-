import { createStudent, getAllEtnias, getAllSexos } from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CrearEstudiantePage() {
  const sexos = await getAllSexos();
  const etnias = await getAllEtnias();

  async function handleCreate(formData: FormData) {
    "use server";

    await createStudent({
      nombre: String(formData.get("nombre")),
      paterno: String(formData.get("paterno")),
      materno: String(formData.get("materno")),
      direccion: String(formData.get("direccion")),
      etnia_id: Number(formData.get("etnia_id")),
      sexo_id: Number(formData.get("sexo_id")),
    });

    redirect("/estudiantes");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Crear Estudiante</h1>
          <p className="text-gray-400 text-sm">
            Registra un nuevo estudiante en el sistema
          </p>
        </div>

        <Link
          href="/estudiantes"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
        >
          ← Regresar
        </Link>
      </div>

      <form
        action={handleCreate}
        className="bg-gray-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nombre"
            placeholder="Nombre"
            className="bg-gray-700 p-3 rounded outline-none"
            required
          />

          <input
            name="paterno"
            placeholder="Apellido Paterno"
            className="bg-gray-700 p-3 rounded outline-none"
            required
          />

          <input
            name="materno"
            placeholder="Apellido Materno"
            className="bg-gray-700 p-3 rounded outline-none"
            required
          />

          <input
            name="direccion"
            placeholder="Dirección"
            className="bg-gray-700 p-3 rounded outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="sexo_id" className="bg-gray-700 p-3 rounded">
            {sexos.map((sexo) => (
              <option key={sexo.id} value={sexo.id}>
                {sexo.nombre}
              </option>
            ))}
          </select>

          <select name="etnia_id" className="bg-gray-700 p-3 rounded">
            {etnias.map((etnia) => (
              <option key={etnia.id} value={etnia.id}>
                {etnia.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
        >
          Crear Estudiante
        </button>
      </form>
    </div>
  );
}
