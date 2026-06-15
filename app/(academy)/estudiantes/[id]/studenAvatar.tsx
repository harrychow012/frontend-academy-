'use client'

import { deleteAvatar, uploadAvatar } from '@/actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  studentId: number
  avatarUrl?: string
}

export function StudentAvatar({ studentId, avatarUrl }: Props) {
  const router = useRouter()
  const handleDelete = async () => {
    try {
      await deleteAvatar(studentId)
      router.refresh()
    } catch (error) {
      console.error('Error al eliminar avatar', error)
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('estudiante_id', String(studentId))
      formData.append('user_id', '1')
      formData.append('user_updated_id', '1')
      formData.append('is_avatar', String(true))

      await uploadAvatar(formData)
      router.refresh()
    } catch (error) {
      console.error('Error al subir avatar', error)
    }
  }

  return (
    <div className='flex flex-col items-center gap-6'>
      {avatarUrl ? (
        <div className='relative w-45 h-45'>
          <Image
            src={`http://localhost:3000${avatarUrl}`}
            alt='avatar'
            fill
            className='rounded-full object-cover border-4 border-gray-600'
            unoptimized
          />
        </div>
      ) : (
        <div className='w-45 h-45 rounded-full bg-gray-700 flex items-center justify-center border-4 border-gray-600'>
          Sin avatar
        </div>
      )}

      <label className='cursor-pointer bg-blue-600 px-3 py-2 rounded font-bold '>
        {avatarUrl ? 'Cambiar avatar' : 'Subir avatar'}
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleUpload}
        />
      </label>

      {avatarUrl && (
        <button
          onClick={handleDelete}
          className='bg-red-600 px-3 py-2 rounded cursor-pointer font-bold'
        >
          Eliminar avatar
        </button>
      )}
    </div>
  )
}
