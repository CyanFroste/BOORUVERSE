import { Router } from 'express'
import { getPosts } from '../../api'
const router = Router()

router.get('/:booru/posts', (req, res, next) => {
    const page = req.query.page as string,
        filters = req.query.filters as string,
        limit = req.query.limit as string,
        booru = req.params.booru

    getPosts(booru, page, filters, limit)
        .then((data) => res.json(data))
        .catch((err) => next(err))
})

export default router
