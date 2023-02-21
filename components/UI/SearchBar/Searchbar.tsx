import Search from "/public/icons/search.svg"
import classes from "./Searchbar.module.scss"
import classNames from "classnames"

interface IPropTypes {
	className?: string
}

const SearchBar = ({ className }: IPropTypes) => {
	const clsx = classNames(className, classes.search)
	return (
		<div className={clsx}>
			<Search className={classes.search__icon} />
			<input
				type='text'
				className={classes.search__input}
				placeholder='Search'
			/>
		</div>
	)
}

export default SearchBar
