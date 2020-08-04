import { Request, Response } from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/hourToMinutes'

interface ScheduleItem {
	week_day: number
	from: string
	to: string
}

export default class ClassesController {
	async index(req: Request, res: Response) {
		const filters = req.query

		const week_day = filters.week_day as string
		const subject = filters.subject as string
		const time = filters.time as string

		if (!week_day || !subject || !time) {
			console.log(week_day, subject, time)

			return res.status(400).json({
				error: 'Missing filters to search classes',
			})
		}

		const timeInMinutes = convertHourToMinutes(time)

		const classes = await db('classes')
			.whereExists(function () {
				this.select('class_schedule.*')
					.from('class_schedule')
					.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
					.whereRaw('`class_schedule`.`week_day` = ??', [
						Number(week_day),
					])
					.whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
					.whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
			})
			.where('classes.subject', '=', subject)
			.join('users', 'classes.user_id', '=', 'users.id')
			.select(['classes.*', 'users.*'])

		return res.json(classes)
	}

	async create(req: Request, res: Response) {
		const {
			name,
			avatar,
			whatsapp,
			bio,
			subject,
			cost,
			schedule,
		} = req.body

		//a transaction is like a queue of db operations that are done together, so if one fails, no incomplete data will make it into the tables
		const trx = await db.transaction()

		try {
			const insrtedUsersIds = await trx('users').insert({
				name,
				avatar,
				whatsapp,
				bio,
			})

			const user_id = insrtedUsersIds[0]

			const insertedClassesIds = await trx('classes').insert({
				subject,
				cost,
				user_id,
			})

			const class_id = insertedClassesIds[0]

			const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
				return {
					class_id,
					week_day: scheduleItem.week_day,
					from: convertHourToMinutes(scheduleItem.from),
					to: convertHourToMinutes(scheduleItem.to),
				}
			})

			await trx('class_schedule').insert(classSchedule)

			await trx.commit()

			return res.status(201).send()
		} catch (err) {
			// on unexpected error, undo all db transactions
			await trx.rollback()

			return res.status(400).json({
				error: 'Unexpected error while creating new class',
			})
		}
	}
}
