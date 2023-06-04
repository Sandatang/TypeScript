import expres from "express"
import * as StudentControllers from "../controllers/user"

const router = expres.Router()

router.get('/', StudentControllers.getStudents)

router.get('/:studentId', StudentControllers.getStudent)

router.post('/', StudentControllers.createStudent)

router.patch('/:studentId', StudentControllers.updateStudent)

router.delete('/:studentId', StudentControllers.deleteStudent)

export default router