import classes from "./Header.module.scss"
import classNames from "classnames"

interface IPropTypes {
	className: string
}
const Header = ({ className }: IPropTypes) => {
	const clsx = classNames(className, classes.header)
	return <header className={clsx}>Header</header>
}

export default Header
