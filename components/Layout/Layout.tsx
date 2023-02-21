import classes from "./Layout.module.scss"
import classNames from "classnames"

interface IPropTypes {
	className?: string
	children: React.ReactElement
}

const Layout = ({ children, className }: IPropTypes) => {
	const clsx = classNames(className, classes.layout)
	return <main className={clsx}>{children}</main>
}

export default Layout
