import classes from "./Header.module.scss"
import classNames from "classnames"
import SearchBar from "../UI/SearchBar/Searchbar"

interface IPropTypes {
	className: string
}
const Header = ({ className }: IPropTypes) => {
	const clsx = classNames(className, classes.header)
	return (
		<header className={clsx}>
			<SearchBar />
		</header>
	)
}

export default Header
