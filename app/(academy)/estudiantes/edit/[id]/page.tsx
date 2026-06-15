import {
  getAllEtnias,
  getAllSexos,
  getOneStudent,
  updateStudent,
} from '@/actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditarEstudiantePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const estudiante = await getOneStudent(Number((await params).id))
  const sexos = await getAllSexos()
  const etnias = await getAllEtnias()

  async function handleUpdate(formData: FormData) {
    'use server'

    await updateStudent(Number((await params).id), {
      nombre: formData.get('nombre') as string,
      paterno: formData.get('paterno') as string,
      materno: formData.get('materno') as string,
      direccion: formData.get('direccion') as string,
      etnia_id: Number(formData.get('etnia_id')),
      sexo_id: Number(formData.get('sexo_id')),
    })

    redirect('/estudiantes')
  }

  return (
    <div className='min-h-screen bg-gray-950 text-gray-100 p-8'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold'>Editar Estudiante</h1>
          <p className='text-gray-400 text-sm'>
            Actualiza la información del estudiante
          </p>
        </div>

        <Link
          href='/estudiantes'
          className='bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition'
        >
          Regresar
        </Link>
      </div>

      <form
        action={handleUpdate}
        className='bg-gray-800 max-w-3xl mx-auto p-8 rounded-2xl shadow-xl space-y-8'
      >
        <div>
          <h2 className='text-xl font-semibold mb-4'>Información Personal</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm text-gray-400'>Nombre</label>
              <input
                type='text'
                name='nombre'
                defaultValue={estudiante.nombre}
                className='w-full bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500'
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-gray-400'>Apellido Paterno</label>
              <input
                type='text'
                name='paterno'
                defaultValue={estudiante.paterno}
                className='w-full bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500'
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-gray-400'>Apellido Materno</label>
              <input
                type='text'
                name='materno'
                defaultValue={estudiante.materno}
                className='w-full bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500'
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-gray-400'>Dirección</label>
              <input
                type='text'
                name='direccion'
                defaultValue={estudiante.direccion}
                className='w-full bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500'
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>Información Adicional</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm text-gray-400'>Sexo</label>
              <select
                name='sexo_id'
                defaultValue={estudiante.sexo?.id}
                className='w-full bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500'
              >
                {sexos.map((sexo) => (
                  <option key={sexo.id} value={sexo.id}>
                    {sexo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-gray-400'>Etnia</label>
              <select
                name='etnia_id'
                defaultValue={estudiante.etnia?.id}
                className='w-full bg-gray-700 border border-gray-600 p-3 rounded-lg focus:outline-none focus:border-blue-500'
              >
                {etnias.map((etnia) => (
                  <option key={etnia.id} value={etnia.id}>
                    {etnia.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold text-lg'
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}
