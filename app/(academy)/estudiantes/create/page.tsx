import { getAllEtnias, getAllSexos } from '@/actions'
import StudentForm from '@/app/(academy)/estudiantes/create/studentForm'
export default async function CrearEstudiantePage() {
  const sexos = await getAllSexos()
  const etnias = await getAllEtnias()

  return <StudentForm sexos={sexos} etnias={etnias} />
}
