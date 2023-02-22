import classes from "./Header.module.scss"
import classNames from "classnames"
import SearchBar from "../UI/SearchBar/Searchbar"
import Menu from "/public/icons/menu.svg"
import Logo from "/public/logo.svg"
import Link from "next/link"

interface IPropTypes {
	className: string
}
const Header = ({ className }: IPropTypes) => {
	const clsx = classNames(className, classes.header)
	return (
		<header className={clsx}>
			<SearchBar />
			<Link href={"/"}>
				<Logo className={classes.header__logobtn} />
			</Link>
			<Menu className={classes.header__menubtn} />
		</header>
	)
}

export default Header
