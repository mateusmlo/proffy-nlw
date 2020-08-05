import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

// icons
import logoImg from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

interface PageHeaderProps {
	title: string
	description?: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
	return (
		<header className="page-header">
			<div className="top-bar-container">
				<Link to="/">
					<img src={backIcon} alt="Voltar" />
				</Link>

				<img src={logoImg} alt="Proffy" />
			</div>

			<div className="header-content">
				<strong>{props.title}</strong>
				{/* The line below is the same as using a ternary op such as "props.desc ? <p>props.desc</p> : undefined". The description p will only render if there is a description passed to PageHeader. */}
				{props.description && <p>{props.description}</p>}

				{props.children}
			</div>
		</header>
	)
}

export default PageHeader
