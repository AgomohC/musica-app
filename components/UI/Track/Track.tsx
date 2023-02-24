import Heart from "/public/icons/Heart.svg"
import classes from "./Track.module.scss"
import classNames from "classnames"
import type { Track as TrackType } from "../../../context/context-types"
import Image from "next/image"
import More from "/public/icons/more.svg"
import Selected from "/public/icons/HeartSelected.svg"

interface IPropTypes {
	className?: string
	track: TrackType
	parentPlaylist: string
}
const Track = ({ className, track, parentPlaylist }: IPropTypes) => {
	const clsx = classNames(className, classes.track)

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
				<Heart className={classes["track__imgHeart"]} />
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
