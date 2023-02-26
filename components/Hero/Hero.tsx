import classes from "./Hero.module.scss"
import classNames from "classnames"
import Image from "next/image"
import banner from "/public/HeroSection.png"
import bannerMobile from "/public/HeroSectionMobile.png"
import Heart from "/public/icons/Heart.svg"
import { totalTimeString } from "../../helpers/add-time"
import Link from "next/link"
import { Playlist, Track } from "../../context/context-types"
import { useLocalContext } from "../../context/AppContext"
import HeartFilled from "/public/icons/HeartSelected.svg"
import { ACTIONS } from "../../context/actions"
import { useCallback } from "react"
interface IPropTypes {
	className?: string
	playlist: Playlist[]
	new_t: Track[]
	popular: Track[]
}

const Hero = ({ className, playlist, new_t, popular }: IPropTypes) => {
	const clsx = classNames(className, classes.hero)
	const { state, dispatch } = useLocalContext()

	const isLiked = useCallback(
		(playlist: Playlist) => {
			return !!state.likes.find(like => like.id === playlist.id)
		},
		[state.likes]
	)
	return (
		<div className={clsx}>
			<div className={classes.banner}>
				<div className={classes.banner__img}>
					<picture>
						<source
							srcSet={banner.src}
							media='(min-width: 768px)'
						/>
						<img
							src={bannerMobile.src}
							alt=''
						/>
					</picture>
				</div>
				<div className={classes.banner__chartCont}>
					<h2 className={classes.banner__chartHead}>Top Charts</h2>
					<div className={classes.banner__chart}>
						{playlist?.length === 0 ? (
							<h4>No results</h4>
						) : (
							playlist?.map(item => {
								const times = item.files.map(file => file.duration)
								const total = totalTimeString(times)
								const artist = item.title.replace(" Playlist", "")
								return (
									<div
										key={item.id}
										className={classes.banner__playlist}
									>
										<div className={classes.banner__playlistInfoCont}>
											<div>
												<Image
													src={item.cover}
													alt={item.title}
													height={63}
													width={63}
													className={classes.banner__playlistImg}
													loading='eager'
												/>
											</div>
											<div className={classes.banner__playlistInfo}>
												<Link href={`/collections/${item.id}`}>
													<h6>{item.title}</h6>
												</Link>
												<p>{artist}</p>
												<p>{total}</p>
											</div>
										</div>
										<div className={classes.banner__playlistIconCont}>
											{isLiked(item) ? (
												<HeartFilled
													className={classes["banner__playlistIcon"]}
													onClick={() => {
														dispatch({
															type: ACTIONS.remove_from_likes,
															payload: item,
														})
													}}
												/>
											) : (
												<Heart
													className={classes["banner__playlistIcon"]}
													onClick={() => {
														dispatch({ type: ACTIONS.add_to_likes, payload: item })
													}}
												/>
											)}
										</div>
									</div>
								)
							})
						)}
					</div>
				</div>
			</div>
			<article className={classes.tracks}>
				<h3>New Releases.</h3>
				<div className={classes.trackCont}>
					{new_t?.length == 0 ? (
						<h4>No results</h4>
					) : (
						new_t?.map(t => {
							return (
								<div
									key={t.id}
									className={classes.trackCard}
								>
									<div className={classes.trackCard__img}>
										<Image
											src={t.cover}
											width={153}
											height={153}
											alt={t.title}
											className={classes.trackCard__img}
											loading='eager'
										/>
									</div>
									<div className={classes.trackCard__info}>
										<p>{t.title}</p>
										<p>{t.artist}</p>
									</div>
								</div>
							)
						})
					)}
				</div>
			</article>
			<article className={classes.tracks}>
				<h3>Popular in your area.</h3>
				<div className={classes.trackCont}>
					{popular?.length == 0 ? (
						<h4>No results</h4>
					) : (
						popular?.map(t => {
							return (
								<div
									key={t.id}
									className={classes.trackCard}
								>
									<div className={classes.trackCard__img}>
										<Image
											src={t.cover}
											width={153}
											height={153}
											alt={t.title}
											className={classes.trackCard__img}
											loading='eager'
										/>
									</div>
									<div className={classes.trackCard__info}>
										<p>{t.title}</p>
										<p>{t.artist}</p>
									</div>
								</div>
							)
						})
					)}
				</div>
			</article>
		</div>
	)
}

export default Hero
