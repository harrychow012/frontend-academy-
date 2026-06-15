'use server'

import { createStudent, uploadAvatar } from '@/actions'

export async function handleCreateStudent(formData: FormData) {
  const avatar = formData.get('avatar') as File

  if (!avatar || avatar.size === 0) {
    return { error: 'El avatar es obligatorio' }
  }

  const estudiante = await createStudent({
    nombre: formData.get('nombre') as string,
    paterno: formData.get('paterno') as string,
    materno: formData.get('materno') as string,
    direccion: formData.get('direccion') as string,
    sexo_id: Number(formData.get('sexo_id')),
    etnia_id: Number(formData.get('etnia_id')),
  })

  const avatarForm = new FormData()
  avatarForm.append('file', avatar)
  avatarForm.append('estudiante_id', String(estudiante.id))
  avatarForm.append('user_id', '1')
  avatarForm.append('user_updated_id', '1')
  avatarForm.append('is_avatar', 'true')

  await uploadAvatar(avatarForm)

  return { success: true }
}
