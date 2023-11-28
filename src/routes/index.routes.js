import { Router } from 'express'
import {
 renderIndex,
 renderAbout,
 renderAdmin,
 renderusuario,
} from '../controllers/index.controller.js'

const router = Router()

router.get('/', renderIndex)
router.get('/about', renderAbout)
router.get('/portalAdmin', renderAdmin)
router.get('/portalusuario', renderusuario)

export default router
