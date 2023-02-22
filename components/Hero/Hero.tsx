import classes from "./Hero.module.scss"
import classNames from "classnames"
import Image from "next/image"
import banner from "/public/HeroSection.png"
import bannerMobile from "/public/HeroSectionMobile.png"
import Heart from "/public/icons/Heart.svg"
import { useLocalContext } from "../../context/AppContext"
import { totalTimeString } from "../../helpers/add-time"

interface IPropTypes {
	className?: string
}

const Hero = ({ className }: IPropTypes) => {
	const {
		state: { all_new_tracks, all_playlists, all_popular_tracks },
	} = useLocalContext()

	const clsx = classNames(className, classes.hero)

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
						{all_playlists?.length === 0 ? (
							<h4>No results</h4>
						) : (
							all_playlists?.map(item => {
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
												/>
											</div>
											<div className={classes.banner__playlistInfo}>
												<h6>{item.title}</h6>
												<p>{artist}</p>
												<p>{total}</p>
											</div>
										</div>
										<div className={classes.banner__playlistIconCont}>
											<Heart className={classes["banner__playlistIcon"]} />
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
					{all_new_tracks?.length == 0 ? (
						<h4>No results</h4>
					) : (
						all_new_tracks?.map(t => {
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
					{all_popular_tracks?.length == 0 ? (
						<h4>No results</h4>
					) : (
						all_popular_tracks?.map(t => {
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
