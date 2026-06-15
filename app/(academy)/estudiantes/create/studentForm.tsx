'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Sexo, Etnia } from '@/types'
import Link from 'next/link'
import { handleCreateStudent } from './createFrom'

export default function StudentForm({
  sexos,
  etnias,
}: {
  sexos: Sexo[]
  etnias: Etnia[]
}) {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    const res = await handleCreateStudent(formData)

    setLoading(false)

    if (res?.error) {
      setError(res.error)
      return
    }

    router.push('/estudiantes')
  }

  const inputClass =
    'w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 transition'

  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center p-6'>
      <form
        onSubmit={onSubmit}
        className='w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6'
      >
        <div className='mb-4'>
          <h1 className='text-3xl font-bold text-white'>Crear Estudiante</h1>
          <p className='text-gray-400 text-lg'>
            Completa los datos del estudiante
          </p>
        </div>

        {error && (
          <div className='bg-red-600/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg'>
            {error}
          </div>
        )}

        <div className='space-y-2'>
          <label className='text-sm text-gray-300 font-medium'>Avatar</label>

          <div className='flex items-center gap-4'>
            <label
              htmlFor='avatar'
              className='cursor-pointer bg-blue-600 hover:bg-blue-700  px-5 py-2 rounded-lg font-medium text-base transition'
            >
              Subir avatar
            </label>

            <span className=' text-lg'>Selecciona una imagen</span>

            <input
              id='avatar'
              type='file'
              name='avatar'
              accept='image/*'
              className='hidden'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-base font-bold'>
          <input name='nombre' placeholder='Nombre' className={inputClass} />
          <input
            name='paterno'
            placeholder='Apellido Paterno'
            className={inputClass}
          />
          <input
            name='materno'
            placeholder='Apellido Materno'
            className={inputClass}
          />
          <input
            name='direccion'
            placeholder='Dirección'
            className={inputClass}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 font-bold'>
          <select name='sexo_id' className={inputClass}>
            <option value=''>Selecciona sexo</option>
            {sexos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>

          <select name='etnia_id' className={inputClass}>
            <option value=''>Selecciona etnia</option>
            {etnias.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className='flex gap-3 justify-center'>
          <button
            disabled={loading}
            className='bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition'
          >
            {loading ? 'Creando...' : 'Crear Estudiante'}
          </button>

          <Link
            href='/estudiantes'
            className='flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition'
          >
            Regresar
          </Link>
        </div>
      </form>
    </div>
  )
}
