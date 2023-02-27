import classes from "./Footer.module.scss"
import classNames from "classnames"
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
import { ACTIONS } from "../../context/actions"
import toast from "react-hot-toast"
import { Quicksand } from "@next/font/google"
const quicksand = Quicksand({
	subsets: ["latin"],
	variable: "--font-quicksand",
	display: "swap",
})
interface IPropTypes {
	className?: string
}
const Footer = ({ className }: IPropTypes) => {
	const { state, dispatch } = useLocalContext()
	const [isPaused, setIsPaused] = useState<boolean>(true)
	const [loop, setLoop] = useState<boolean>(false)
	const [shuffle, setShuffle] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [volume, setVolume] = useState<number>(50)
	const audio = useRef<HTMLAudioElement>(null)

	const clsx = state.currentTrack
		? classNames(className, classes["footer--show"])
		: classNames(className, classes.footer)
	const nextFn = () => {
		const index = state.queue.findIndex(track => track.id === state.currentTrack?.id)
		if (shuffle) {
			let random = Math.floor(Math.random() * (state.queue.length - 1 - 0) + 0)
			if (random == index) {
				if (random >= state.queue.length - 1) {
					random = random - 1
				} else if (random <= 0) {
					random = random + 1
				} else {
					random = index + 1
				}
			}

			dispatch({ type: ACTIONS.set_current_track, payload: state.queue[random] })
			return
		}

		if (index >= state.queue.length - 1) {
			dispatch({ type: ACTIONS.set_current_track, payload: state.queue[0] })
			return
		}
		dispatch({ type: ACTIONS.set_current_track, payload: state.queue[index + 1] })
	}

	const prevFn = () => {
		const index = state.queue.findIndex(track => track.id === state.currentTrack?.id)
		if (index <= 0) {
			dispatch({ type: ACTIONS.set_current_track, payload: state.queue[state.queue.length - 1] })
			return
		}
		dispatch({ type: ACTIONS.set_current_track, payload: state.queue[index + 1] })
	}
	useEffect(() => {
		if (audio.current) {
			audio.current.volume = volume / 100
			setIsPaused(false)
			const p = audio.current.play()
			if (p !== undefined) {
				p.then(() => {}).catch(error => {
					toast("Something went wrong", {
						icon: "❌",
						className: classes.toast,
						style: {
							background: "#1a1e1f",
							color: "#fff",
							borderRadius: "0.5rem",
						},
					})
					dispatch({ type: ACTIONS.set_current_track, payload: null })
					setIsPaused(true)
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.currentTrack])
	useEffect(() => {
		if (audio.current) {
			audio.current.loop = loop
		}
	}, [loop])

	useEffect(() => {
		if (audio.current?.ended) {
			nextFn()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [audio.current?.ended, state.currentTrack])

	useEffect(() => {
		const timer = setInterval(() => {
			if (audio.current) {
				setCurrentTime(audio.current.currentTime)
			}
			return () => clearInterval(timer)
		}, 1000)
	}, [state.currentTrack])

	useEffect(() => {
		function eventFn(this: Document, ev: KeyboardEvent) {
			if (ev.key == " " || ev.code == "Space" || ev.keyCode == 32) {
				if (audio.current) {
					if (isPaused) {
						const p = audio.current.play()
						setIsPaused(false)
						if (p !== undefined) {
							p.then(() => {}).catch(error => {
								toast("Something went wrong", {
									icon: "❌",
									className: classes.toast,
									style: {
										background: "#1a1e1f",
										color: "#fff",
										borderRadius: "0.5rem",
									},
								})
								dispatch({ type: ACTIONS.set_current_track, payload: null })
								setIsPaused(true)
							})
						}
					}

					if (!isPaused) {
						audio.current.pause()
						setIsPaused(true)
					}
				}
			}
		}
		document.addEventListener("keydown", eventFn)
		return () => document.removeEventListener("keydown", eventFn)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPaused])

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
							<Shuffle
								className={
									shuffle
										? classes["footer__shuffleIcon--active"]
										: classes.footer__shuffleIcon
								}
								onClick={() => {
									setShuffle(s => !s)
								}}
							/>
							<Next
								className={classes.footer__prevIcon}
								onClick={prevFn}
							/>
							{state.currentTrack ? (
								<div
									className={classes.footer__playIcon}
									onClick={() => {
										if (isPaused) {
											setIsPaused(false)
											const p = audio.current?.play()
											if (p !== undefined) {
												p.then(() => {}).catch(error => {
													toast("Something went wrong", {
														icon: "❌",
														className: classes.toast,
														style: {
															background: "#1a1e1f",
															color: "#fff",
															borderRadius: "0.5rem",
														},
													})
													dispatch({
														type: ACTIONS.set_current_track,
														payload: null,
													})
													setIsPaused(true)
												})
											}
										} else {
											setIsPaused(true)
											audio.current?.pause()
										}
									}}
								>
									{!isPaused ? <Pause className={classes.footer__pauseIcon} /> : <Play />}
								</div>
							) : (
								<div className={classes.footer__playIcon}>
									<Play />
								</div>
							)}
							<Next onClick={nextFn} />
							<Repeat
								className={
									loop ? classes["footer__repeatIcon--active"] : classes.footer__repeatIcon
								}
								onClick={() => setLoop(l => !l)}
							/>
						</div>
						<Range
							onChange={event => {
								if (audio.current) {
									audio.current.currentTime = +event.target.value
									setCurrentTime(+event.target.value)
								}
							}}
							value={currentTime}
							className={classes.footer__progress}
							min={0}
							max={Math.floor(audio.current?.duration as number) || 30}
						/>
					</div>

					<div className={classes.footer__volume}>
						<Volume />
						<Range
							onChange={event => {
								if (audio.current) {
									audio.current.volume = +event.target.value / 100
									setVolume(+event.target.value)
								}
							}}
							value={volume}
							min={0}
							max={100}
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
