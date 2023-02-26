import Heart from "/public/icons/Heart.svg"
import classes from "./Track.module.scss"
import classNames from "classnames"
import type { Track, Track as TrackType } from "../../../context/context-types"
import Image from "next/image"
import More from "/public/icons/more.svg"
import Selected from "/public/icons/HeartSelected.svg"
import { useLocalContext } from "../../../context/AppContext"
import { useCallback } from "react"
import { ACTIONS } from "../../../context/actions"

interface IPropTypes {
	className?: string
	track: TrackType
	parentPlaylist: string
}
const Track = ({ className, track, parentPlaylist }: IPropTypes) => {
	const clsx = classNames(className, classes.track)
	const { state, dispatch } = useLocalContext()

	const isLiked = useCallback(
		(t: Track) => {
			return !!state.likedTracks.find(like => like.id === t.id)
		},
		[state.likedTracks]
	)
	return (
		<div className={clsx}>
			<div className={classes.track__imgCont}>
				<Image
					src={track.cover}
					alt={track.title}
					height={80}
					width={80}
					className={classes.track__img}
					loading='eager'
				/>
				{isLiked(track) ? (
					<Selected
						className={classes["track__imgHeart"]}
						onClick={() => {
							dispatch({ type: ACTIONS.remove_from_liked_tracks, payload: track })
						}}
					/>
				) : (
					<Heart
						className={classes["track__imgHeart"]}
						onClick={() => {
							dispatch({ type: ACTIONS.add_to_liked_tracks, payload: track })
						}}
					/>
				)}
			</div>
			<div className={classes.track__infoCont}>
				<div className={classes.track__info}>
					<h6>
						{track.title} ~ {track.artist}
					</h6>
					<h6>{parentPlaylist?.replace(" Playlist", "")}</h6>
				</div>
				<div className={classes.track__info}>
					<h6>{track.duration}</h6>
					<More />
				</div>
			</div>
		</div>
	)
}

export default Track
