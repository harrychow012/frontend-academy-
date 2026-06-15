import { getOneStudent, getStudentAvatar } from '@/actions'
import Link from 'next/link'
import { StudentAvatar } from '@/app/(academy)/estudiantes/[id]/studenAvatar'

export default async function VerEstudiantePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const estudiante = await getOneStudent(Number((await params).id))
  const avatar = await getStudentAvatar(estudiante.id)

  return (
    <div className='min-h-screen bg-gray-950 text-gray-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold'>Detalle del Estudiante</h1>
            <p className='text-gray-400 text-sm'>
              Información completa del estudiante
            </p>
          </div>
          <div className='p-6 flex justify-end gap-4'>
            <Link
              href='/estudiantes'
              className='bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition'
            >
              Regresar
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center'>
            <StudentAvatar studentId={estudiante.id} avatarUrl={avatar?.url} />
          </div>
          <div className='md:col-span-2 bg-gray-800 rounded-2xl shadow-xl p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='text-xs uppercase tracking-wider text-gray-400'>
                  Nombre
                </label>
                <div className='mt-1 bg-gray-700 rounded-lg p-3'>
                  {estudiante.nombre}
                </div>
              </div>

              <div>
                <label className='text-xs uppercase tracking-wider text-gray-400'>
                  Apellido Paterno
                </label>
                <div className='mt-1 bg-gray-700 rounded-lg p-3'>
                  {estudiante.paterno}
                </div>
              </div>

              <div>
                <label className='text-xs uppercase tracking-wider text-gray-400'>
                  Apellido Materno
                </label>
                <div className='mt-1 bg-gray-700 rounded-lg p-3'>
                  {estudiante.materno}
                </div>
              </div>

              <div>
                <label className='text-xs uppercase tracking-wider text-gray-400'>
                  Sexo
                </label>
                <div className='mt-1 bg-gray-700 rounded-lg p-3'>
                  {estudiante.sexo?.nombre ?? 'No asignado'}
                </div>
              </div>

              <div>
                <label className='text-xs uppercase tracking-wider text-gray-400'>
                  Etnia
                </label>
                <div className='mt-1 bg-gray-700 rounded-lg p-3'>
                  {estudiante.etnia?.nombre ?? 'No asignada'}
                </div>
              </div>

              <div className='md:col-span-2'>
                <label className='text-xs uppercase tracking-wider text-gray-400'>
                  Dirección
                </label>
                <div className='mt-1 bg-gray-700 rounded-lg p-3'>
                  {estudiante.direccion}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
