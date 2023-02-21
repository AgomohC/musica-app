import classes from "./Footer.module.scss"
import classNames from "classnames"

interface IPropTypes {
	className: string
}
const Footer = ({ className }: IPropTypes) => {
	const clsx = classNames(className, classes.footer)

	return <footer className={clsx}>Footer</footer>
}

export default Footer
