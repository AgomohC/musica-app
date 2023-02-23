import classes from "./MobileNav.module.scss"
import classNames from "classnames"
import Home from "/public/icons/Home.svg"
import Playlist from "/public/icons/playlist.svg"
import Radio from "/public/icons/radio.svg"
import Videos from "/public/icons/videos.svg"
import Profile from "/public/icons/profile.svg"
import Logout from "/public/icons/Logout.svg"
import Logo from "/public/logo.svg"
import Close from "/public/icons/Close.svg"
import Link from "next/link"
import { useRouter } from "next/router"
import { useLocalContext } from "../../context/AppContext"
import { ACTIONS } from "../../context/actions"

interface IPropTypes {
	className?: string
}

const MobileNav = ({ className }: IPropTypes) => {
	const {
		state: { isSideBarOpen },
		dispatch,
	} = useLocalContext()
	const clsx = classNames(className, `${isSideBarOpen ? classes["nav--active"] : classes.nav}`)

	const { pathname } = useRouter()
	const isPlaylist = pathname.includes("collections")

	return (
		<nav className={clsx}>
			<div className={classes.nav__close}>
				<Close
					className={classes.nav__closeIcon}
					onClick={() => {
						if (isSideBarOpen) {
							dispatch({ type: ACTIONS.toggle_sidebar })
						}
					}}
				/>
			</div>
			<div className={classes.nav__links}>
				<Link
					href={"/"}
					onClick={() => {
						if (isSideBarOpen) dispatch({ type: ACTIONS.toggle_sidebar })
					}}
					className={classes[`nav__linkCont${pathname == "/" ? "--active" : ""}`]}
				>
					<Home className={classes[`nav__link${pathname == "/" ? "--active" : ""}`]} /> Home
				</Link>
				<Link
					href={"/collections"}
					className={classes[`nav__linkCont${isPlaylist ? "--active" : ""}`]}
					onClick={() => {
						if (isSideBarOpen) dispatch({ type: ACTIONS.toggle_sidebar })
					}}
				>
					<Playlist className={classes[`nav__link${isPlaylist ? "--active" : ""}`]} /> My
					collections
				</Link>
				<Link
					href={"#"}
					className={classes.nav__linkCont}
					onClick={() => {
						if (isSideBarOpen) dispatch({ type: ACTIONS.toggle_sidebar })
					}}
				>
					<Radio className={classes[`nav__link`]} /> Radio
				</Link>
				<Link
					href={"#"}
					className={classes.nav__linkCont}
					onClick={() => {
						if (isSideBarOpen) dispatch({ type: ACTIONS.toggle_sidebar })
					}}
				>
					<Videos className={classes[`nav__link`]} /> Music videos
				</Link>
				<Link
					href={"#"}
					className={classes.nav__linkCont}
					onClick={() => {
						if (isSideBarOpen) dispatch({ type: ACTIONS.toggle_sidebar })
					}}
				>
					<Profile className={classes[`nav__link`]} /> Profile
				</Link>
				<Link
					href={"#"}
					className={classes.nav__linkCont}
					onClick={() => {
						if (isSideBarOpen) dispatch({ type: ACTIONS.toggle_sidebar })
					}}
				>
					<Logout className={classes[`nav__link`]} /> Logout
				</Link>
			</div>
		</nav>
	)
}

export default MobileNav
