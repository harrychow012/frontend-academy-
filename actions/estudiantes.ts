'use server'
import { Etnia, Sexo } from '@/types'
import { CreateEstudianteDto } from '@/types/Estudiantes/create.interface'
import { Estudiante } from '@/types/Estudiantes/estudiantes.interface'
import { revalidatePath } from 'next/cache'

const URL = `${process.env.GATEWAY_URL}`

export async function getAllSexos(): Promise<Sexo[]> {
  const response = await fetch(`${URL}/relaciones/sexo`, { cache: 'no-store' })

  const data = await response.json()

  return data.data ?? []
}

export async function getAllEtnias(): Promise<Etnia[]> {
  const response = await fetch(`${URL}/relaciones/etnia`, {
    cache: 'no-store',
  })
  const data = await response.json()
  return data.data ?? []
}

export async function getAllStudents(): Promise<Estudiante[]> {
  const response = await fetch(`${URL}/estudiantes`, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error('Error al obtener a los estudiantes')
  }

  const data = await response.json()

  if (Array.isArray(data?.data)) return data.data

  console.error('Respuesta inesperada al obtener estudiantes:', data)

  return []
}

export async function getOneStudent(id: number): Promise<Estudiante> {
  const response = await fetch(`${URL}/estudiantes/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Error al obtener el estudiante')
  }

  const data = await response.json()

  return data.data
}

export async function createStudent(body: CreateEstudianteDto) {
  const response = await fetch(`${URL}/estudiantes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error('Error al crear el estudiante')
  }
  const data = await response.json()
  revalidatePath('/estudiantes')

  return data.data
}

export async function updateStudent(id: number, body: CreateEstudianteDto) {
  const response = await fetch(`${URL}/estudiantes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error('Error al actualizar el estudiante')
  }
  revalidatePath('/estudiantes')
}

export async function deleteStudent(formData: FormData) {
  const id = Number(formData.get('id'))

  const response = await fetch(`${URL}/estudiantes/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Error al eliminar el estudiante')
  }

  revalidatePath('/estudiantes')
}

export async function uploadAvatar(formData: FormData) {
  const response = await fetch(`${URL}/files`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Error al subir el avatar')
  }

  revalidatePath('/estudiantes')
  revalidatePath(`/estudiantes/${formData.get('estudiante_id')}`)
}

export async function getStudentAvatar(id: number) {
  const response = await fetch(`${URL}/files/${id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json().catch(() => null)

  return data?.data ?? data ?? null
}
export async function deleteAvatar(studentId: number) {
  const response = await fetch(`${URL}/files/${studentId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Error al eliminar avatar')
  }

  revalidatePath('/estudiantes')
  revalidatePath(`/estudiantes/${studentId}`)
}
