import classes from "./Footer.module.scss"
import classNames from "classnames"
import { Track } from "../../context/context-types"
import { useLocalContext } from "../../context/AppContext"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Range from "../UI/Range/Range"
import Next from "/public/icons/next.svg"
import Repeat from "/public/icons/repeat.svg"
import Shuffle from "/public/icons/shuffle.svg"
import Play from "/public/icons/Play-Mini.svg"
import Volume from "/public/icons/volume.svg"
import Pause from "/public/icons/Pause.svg"
interface IPropTypes {
	className?: string
}
const Footer = ({ className }: IPropTypes) => {
	const { state, dispatch } = useLocalContext()
	const clsx = classNames(className, classes.footer)

	const audio = useRef<HTMLAudioElement>(null)

	return (
		<footer className={clsx}>
			{state.currentTrack ? (
				<>
					<audio
						src={state.currentTrack?.audio}
						ref={audio}
					/>

					<div className={classes.footer__info}>
						<Image
							src={state.currentTrack.cover}
							alt={state.currentTrack.title}
							width={100}
							height={100}
						/>
						<div>
							<p>{state.currentTrack.title}</p>
							<p>{state.currentTrack.artist}</p>
						</div>
					</div>
					<div className={classes.footer__actions}>
						<div className={classes.footer__actionsControls}>
							<Shuffle className={classes.footer__shuffleIcon} />
							<Next className={classes.footer__prevIcon} />
							<Pause />
							<div className={classes.footer__playIcon}>
								<Play />
							</div>
							<Next />
							<Repeat className={classes.footer__repeatIcon} />
						</div>
						<Range
							onChange={() => {}}
							value={23}
							className={classes.footer__progress}
						/>
					</div>

					<div className={classes.footer__volume}>
						<Volume />
						<Range
							onChange={() => {}}
							value={23}
							type={"volume"}
						/>
					</div>
				</>
			) : (
				<h3>Start Listening</h3>
			)}
		</footer>
	)
}

export default Footer
