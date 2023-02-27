import classes from "./Collections.module.scss"
import classNames from "classnames"
import Link from "next/link"
import { Playlist } from "../../context/context-types"
import Image from "next/image"
import PlayFilled from "/public/icons/PlayFilled.svg"
import { useRouter } from "next/router"
import { useLocalContext } from "../../context/AppContext"
import { ACTIONS } from "../../context/actions"

interface IPropTypes {
	className?: string
	playlists: Playlist[]
}

const Collections = ({ className, playlists }: IPropTypes) => {
	const clsx = classNames(className, classes.collections)
	const router = useRouter()

	const { state, dispatch } = useLocalContext()
	return (
		<section className={clsx}>
			<div className={classes.collections__navCont}>
				<Link
					href={"/collections"}
					className={
						!router.pathname.includes("/likes")
							? classes["collections__navLink--active"]
							: classes.collections__navLink
					}
				>
					My collections
				</Link>
				<Link
					href={"/collections/likes"}
					className={
						router.pathname.includes("/likes")
							? classes["collections__navLink--active"]
							: classes.collections__navLink
					}
				>
					Likes
				</Link>
			</div>
			<div className={classes.playlist}>
				{!playlists || playlists?.length < 1 ? (
					<h2>No results</h2>
				) : (
					playlists?.map(playlist => {
						return (
							<div
								key={playlist.id}
								className={classes.playlist__card}
								onClick={() => {
									router.push(`/collections/${playlist.id}`)
								}}
							>
								<Image
									src={playlist.cover}
									alt={playlist.title}
									width={300}
									height={234}
									className={classes.playlist__cardImg}
								/>
								<div className={classes.playlist__cardInfo}>
									<h6>{playlist.title.replace(" Playlist", "")}</h6>
									<p>{playlist.title.replace(" Playlist", "")}</p>
									<p>2.3m likes</p>
								</div>
								<PlayFilled
									className={classes.playlist__cardIcon}
									onClick={(event: MouseEvent) => {
										event.stopPropagation()
										dispatch({
											type: ACTIONS.set_current_track,
											payload: playlist.files[0],
										})
										dispatch({ type: ACTIONS.set_queue, payload: playlist.files })
										router.push(`/collections/${playlist.id}`)
									}}
								/>
							</div>
						)
					})
				)}
			</div>
		</section>
	)
}

export default Collections
