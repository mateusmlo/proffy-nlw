import React, { useState, FormEvent } from 'react'

// components
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

//styles
import './styles.css'
import api from '../../services/api'

function TeacherList() {
	const [subject, setSubject] = useState(''),
		[week_day, setWeekday] = useState(''),
		[time, setTime] = useState(''),
		[teachers, setTeachers] = useState([])

	const searchTeachers = async (e: FormEvent) => {
		e.preventDefault()

		const res = await api.get('/classes', {
			params: {
				subject,
				week_day,
				time,
			},
		})

		setTeachers(res.data)
	}

	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis.">
				<form id="search-teachers" onSubmit={searchTeachers}>
					<Select
						name="subject"
						label="Matéria"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						options={[
							{ value: 'Artes', label: 'Artes' },
							{ value: 'Biologia', label: 'Biologia' },
							{ value: 'Ciências', label: 'Ciências' },
							{ value: 'Física', label: 'Física' },
							{ value: 'Geografia', label: 'Geografia' },
							{ value: 'Matemática', label: 'Matemática' },
							{ value: 'Português', label: 'Português' },
							{ value: 'Química', label: 'Química' },
							{ value: 'História', label: 'História' },
						]}
					/>
					<Select
						name="week_day"
						label="Dia da semana"
						value={week_day}
						onChange={(e) => setWeekday(e.target.value)}
						options={[
							{ value: '0', label: 'Domingo' },
							{ value: '1', label: 'Segunda-feira' },
							{ value: '2', label: 'Terça-feira' },
							{ value: '3', label: 'Quarta-feira' },
							{ value: '4', label: 'Quinta-feira' },
							{ value: '5', label: 'Sexta-feira' },
							{ value: '6', label: 'Sábado' },
						]}
					/>
					<Input
						type="time"
						name="time"
						label="Hora"
						value={time}
						onChange={(e) => setTime(e.target.value)}
					/>

					<button type="submit">Buscar</button>
				</form>
			</PageHeader>

			<main>
				{teachers.map((teacher: Teacher) => (
					<TeacherItem key={teacher.id} teacher={teacher} />
				))}
			</main>
		</div>
	)
}

export default TeacherList
