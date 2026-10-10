import {addCareerAction} from "../(actions)/addNewCareer"
import CreateCareerForm from '@/components/dashboard/careers/createComponents/NewCareerForm'

async function page() {

  
  return (
    <div className='w-full' >
      <CreateCareerForm action={addCareerAction} />
    </div>
  )
}

export default page