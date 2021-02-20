import { Router } from 'express'
const router = Router()

router.get('/test', (req, res, next) => {
    // throw new Error("route doesn't work now!")
    res.json('route works!')
})

export default router
