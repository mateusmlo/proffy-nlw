import React from 'react'
import api from '../../services/api'

//styles
import './styles.css'

//icons
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

export interface Teacher {
	avatar: string
	bio: string
	cost: number
	id: number
	name: string
	subject: string
	whatsapp: string
}

interface TeacherItemProps {
	teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
	const createNewConnection = () => {
		api.post('/connections', {
			user_id: teacher.id,
		})
	}

	return (
		<article className="teacher-item">
			<header>
				<img src={teacher.avatar} alt={teacher.name} />
				<div>
					<strong>{teacher.name}</strong>
					<span>{teacher.subject}</span>
				</div>
			</header>

			<p>{teacher.bio}</p>

			<footer>
				<p>
					Preço/hora
					<strong>R$ {teacher.cost}</strong>
				</p>
				<a
					target="_blank"
					rel="noopener"
					onClick={createNewConnection}
					href={`https://wa.me/${teacher.whatsapp}`}
					about="_blank"
				>
					<img src={whatsappIcon} alt="WhatsApp" />
					Entrar em contato
				</a>
			</footer>
		</article>
	)
}

export default TeacherItem
