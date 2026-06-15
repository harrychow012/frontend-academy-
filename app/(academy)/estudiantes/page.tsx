import { deleteStudent, getAllStudents } from '@/actions'
import Link from 'next/link'

export default async function ObtenerEstudiantes() {
  const estudiantes = await getAllStudents()

  return (
    <div className='min-h-screen bg-gray-950 text-white p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8'>
          <div>
            <h1 className='text-4xl font-bold'>Gestión de Estudiantes</h1>

            <p className='text-gray-400 mt-1'>
              {estudiantes.length} estudiantes registrados
            </p>
          </div>

          <div className='flex gap-3'>
            <Link
              href='/'
              className='px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition'
            >
              Regresar
            </Link>

            <Link
              href='/estudiantes/create'
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium'
            >
              Nuevo Estudiante
            </Link>
          </div>
        </div>

        <div className='bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-800 border-b border-gray-700 text-lg'>
                  <th className='p-4 text-left'>Nombre</th>
                  <th className='p-4 text-left'>Paterno</th>
                  <th className='p-4 text-left'>Materno</th>
                  <th className='p-4 text-left'>Dirección</th>
                  <th className='p-4 text-left'>Etnia</th>
                  <th className='p-4 text-left'>Sexo</th>
                  <th className='p-4 text-center'>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {estudiantes.map((est) => (
                  <tr
                    key={est.id}
                    className='border-b border-gray-700 hover:bg-gray-800/50 transition'
                  >
                    <td className='p-4 font-bold'>{est.nombre}</td>

                    <td className='p-4 font-bold'>{est.paterno}</td>

                    <td className='p-4 font-bold'>{est.materno}</td>

                    <td className='p-4 font-bold'>{est.direccion}</td>

                    <td className='p-4'>
                      <span className=' text-base font-bold'>
                        {est.etnia?.nombre}
                      </span>
                    </td>

                    <td className='p-4'>
                      <span className=' text-base font-bold'>
                        {est.sexo?.nombre}
                      </span>
                    </td>

                    <td className='p-4'>
                      <div className='flex justify-center gap-6'>
                        <Link
                          href={`/estudiantes/${est.id}`}
                          className='bg-slate-600 hover:bg-slate-700 px-3 py-1 rounded-md text-base font-bold'
                        >
                          Ver
                        </Link>

                        <Link
                          href={`/estudiantes/edit/${est.id}`}
                          className='bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-base font-bold'
                        >
                          Editar
                        </Link>

                        <form action={deleteStudent}>
                          <input type='hidden' name='id' value={est.id} />

                          <button
                            type='submit'
                            className='bg-red-700 hover:bg-red-900 px-3 py-1 rounded-md text-base font-bold'
                          >
                            Eliminar
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
