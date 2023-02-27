import classes from "./PlaylistView.module.scss"
import classNames from "classnames"
import { Playlist } from "../../context/context-types"
import { totalTimeString } from "../../helpers/add-time"
import Image from "next/image"
import Heart from "/public/icons/Heart.svg"
import Collection from "/public/icons/music-square-add.svg"
import Track from "../UI/Track/Track"
import Play from "/public/icons/Play.svg"
import Selected from "/public/icons/HeartSelected.svg"
import { useLocalContext } from "../../context/AppContext"
import { useCallback } from "react"
import { ACTIONS } from "../../context/actions"
interface IPropTypes {
	className?: string
	playlist: Playlist
}
const PlaylistView = ({ className, playlist }: IPropTypes) => {
	const clsx = classNames(className, classes.view)
	const { title, cover, files, info } = playlist
	const times = files.map(file => file.duration)
	const duration = totalTimeString(times)
	const { state, dispatch } = useLocalContext()

	const isLiked = useCallback(
		(playlist: Playlist) => {
			return !!state.likes.find(like => like.id === playlist.id)
		},
		[state.likes]
	)
	return (
		<section className={clsx}>
			<div className={classes.view__head}>
				<div className={classes.view__headImg}>
					<Image
						src={cover}
						alt={title}
						width={500}
						height={500}
						loading='eager'
					/>
				</div>
				<div className={classes.view__headInfo}>
					<div className={classes.view__headInfoText}>
						<h3>{title}</h3>
						<h4>{info}</h4>
						<h6>
							{files.length} songs ~ {duration}
						</h6>
					</div>
					<div className={classes.view__headControls}>
						<span
							onClick={() => {
								dispatch({ type: ACTIONS.set_current_track, payload: playlist.files[0] })
								dispatch({ type: ACTIONS.set_queue, payload: playlist.files })
							}}
						>
							<Play />
							Play all
						</span>
						<span>
							<Collection /> Add to collection
						</span>
						<span>
							{isLiked(playlist) ? (
								<Selected
									className={classes.view__headControlHeart}
									onClick={() => {
										dispatch({
											type: ACTIONS.remove_from_likes,
											payload: playlist,
										})
									}}
								/>
							) : (
								<Heart
									className={classes.view__headControlHeart}
									onClick={() => {
										dispatch({ type: ACTIONS.add_to_likes, payload: playlist })
									}}
								/>
							)}
						</span>
					</div>
				</div>
			</div>
			<div className={classes.view__body}>
				{files.map(file => {
					return (
						<Track
							key={file.id}
							track={file}
							parentPlaylist={playlist}
						/>
					)
				})}
			</div>
		</section>
	)
}

export default PlaylistView
