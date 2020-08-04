import React from 'react'

//styles
import './styles.css'

//icons
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

const TeacherItem = () => {
	return (
		<article className="teacher-item">
			<header>
				<img
					src="https://avatars2.githubusercontent.com/u/13263031?s=460&u=f6359d56afb8177d959373bae48eada269ced4d4&v=4"
					alt="Avatar"
				/>
				<div>
					<strong>Mateus Oliveira</strong>
					<span>Química</span>
				</div>
			</header>

			<p>
				Entusiasta das melhores tecnologias de química avançada.
				<br />
				<br />
				Apaixonado por explodir coisas em laboratório e por mudar a vida
				das pessoas atráves de experiências. Mais de 200.000 pessoas já
				passaram por uma das minhas explosões.
			</p>

			<footer>
				<p>
					Preço/hora
					<strong>R$ 80,00</strong>
				</p>
				<button>
					<img src={whatsappIcon} alt="WhatsApp" />
					Entrar em contato
				</button>
			</footer>
		</article>
	)
}

export default TeacherItem
