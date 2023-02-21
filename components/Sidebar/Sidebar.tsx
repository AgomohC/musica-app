import classes from "./Sidebar.module.scss"
import classNames from "classnames"

interface IPropTypes {
	className: string
}
const Sidebar = ({ className }: IPropTypes) => {
	const clsx = classNames(className, classes.aside)
	return <aside className={clsx}>sidebar</aside>
}

export default Sidebar
