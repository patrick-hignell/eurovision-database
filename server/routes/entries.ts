import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import * as db from '../db/entries'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const entries = await db.getAllEntries()
    res.status(StatusCodes.OK).json(entries)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

// router.get('/:id', async (req, res) => {
//   try {
//     const id = Number(req.params.id)
//     const entry = await db.getEntryById(id)
//     if (!entry) {
//       return res.status(StatusCodes.NOT_FOUND).send('Entry not found')
//     }
//     res.status(StatusCodes.OK).json(entry)
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error(err.message)
//     } else {
//       console.error('something went wrong')
//     }
//     res.sendStatus(500)
//   }
// })

router.post('/', async (req, res) => {
  try {
    const newEntry = await db.addEntry(req.body)
    res.status(StatusCodes.CREATED).json(newEntry)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

router.put('/', async (req, res) => {
  try {
    const updatedEntry = await db.updateEntry(req.body.id, req.body)
    if (!updatedEntry) {
      return res.status(StatusCodes.NOT_FOUND).send('Card not found')
    }
    res.status(StatusCodes.OK).json(updatedEntry)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

router.delete('/', async (req, res) => {
  try {
    const deletedEntry = await db.deleteEntry(req.body.id)
    if (!deletedEntry) {
      // Check if deletion was unsuccessful
      return res.status(StatusCodes.NOT_FOUND).send('Card not found')
    }
    res.status(StatusCodes.NO_CONTENT).json(deletedEntry)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('something went wrong')
    }
    res.sendStatus(500)
  }
})

export default router
