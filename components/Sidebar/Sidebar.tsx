import classes from "./Sidebar.module.scss"
import classNames from "classnames"
import Home from "/public/icons/Home.svg"
import Playlist from "/public/icons/playlist.svg"
import Radio from "/public/icons/radio.svg"
import Videos from "/public/icons/videos.svg"
import Profile from "/public/icons/profile.svg"
import Logout from "/public/icons/Logout.svg"
import Logo from "/public/logo.svg"
import Link from "next/link"
import { useRouter } from "next/router"

interface IPropTypes {
	className: string
}
const Sidebar = ({ className }: IPropTypes) => {
	const clsx = classNames(className, classes.aside)
	const { pathname } = useRouter()
	const isPlaylist = pathname.includes("collections")
	return (
		<aside className={clsx}>
			<Link href={"/"}>
				<Logo className={classes.header__logobtn} />
			</Link>
			<div className={classes.aside__links}>
				<Link href={"/"}>
					<Home className={classes[`aside__link${pathname == "/" ? "--active" : ""}`]} />
				</Link>
				<Link href={"/collections"}>
					<Playlist className={classes[`aside__link${isPlaylist ? "--active" : ""}`]} />
				</Link>
				<Radio className={classes[`aside__link`]} />
				<Videos className={classes[`aside__link`]} />
			</div>
			<div className={classes.aside__links}>
				<Profile className={classes[`aside__link`]} />
				<Logout className={classes[`aside__link`]} />
			</div>
		</aside>
	)
}

export default Sidebar
