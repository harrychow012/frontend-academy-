import {
  getAllEtnias,
  getAllSexos,
  getOneStudent,
  updateStudent,
} from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditarEstudiantePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const estudiante = await getOneStudent(Number((await params).id));
  const sexos = await getAllSexos();
  const etnias = await getAllEtnias();

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateStudent(Number((await params).id), {
      nombre: formData.get("nombre") as string,
      paterno: formData.get("paterno") as string,
      materno: formData.get("materno") as string,
      direccion: formData.get("direccion") as string,
      etnia_id: Number(formData.get("etnia_id")),
      sexo_id: Number(formData.get("sexo_id")),
    });

    redirect("/estudiantes");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Editar Estudiante</h1>

        <Link
          href="/estudiantes"
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition"
        >
          ← Regresar
        </Link>
      </div>

      <form
        action={handleUpdate}
        className="bg-gray-800 max-w-2xl mx-auto p-6 rounded-xl shadow-lg space-y-4"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          defaultValue={estudiante.nombre}
          className="w-full bg-gray-700 text-white p-3 rounded outline-none"
          required
        />

        <input
          type="text"
          name="paterno"
          placeholder="Apellido Paterno"
          defaultValue={estudiante.paterno}
          className="w-full bg-gray-700 text-white p-3 rounded outline-none"
          required
        />

        <input
          type="text"
          name="materno"
          placeholder="Apellido Materno"
          defaultValue={estudiante.materno}
          className="w-full bg-gray-700 text-white p-3 rounded outline-none"
          required
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          defaultValue={estudiante.direccion}
          className="w-full bg-gray-700 text-white p-3 rounded outline-none"
          required
        />

        <select
          name="sexo_id"
          defaultValue={estudiante.sexo?.id}
          className="w-full bg-gray-700 text-white p-3 rounded"
        >
          {sexos.map((sexo) => (
            <option key={sexo.id} value={sexo.id}>
              {sexo.nombre}
            </option>
          ))}
        </select>

        <select
          name="etnia_id"
          defaultValue={estudiante.etnia?.id}
          className="w-full bg-gray-700 text-white p-3 rounded"
        >
          {etnias.map((etnia) => (
            <option key={etnia.id} value={etnia.id}>
              {etnia.nombre}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded font-semibold"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
