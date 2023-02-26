import classes from "./Range.module.scss"
import classNames from "classnames"

interface IPropTypes {
	className?: string
	onChange: React.ChangeEventHandler
	value: number
	type?: "volume"
}

const Range = ({ className, onChange, value, type }: IPropTypes) => {
	const clsx = classNames(className, classes.rangeCont)
	const handleChange = (e: React.ChangeEvent) => {
		onChange(e)
	}

	return (
		<div className={clsx}>
			<div className={classes.range}>
				<div
					className={classes.range__indicator}
					style={{ width: `${value}%` }}
				></div>
				<span
					className={type ? classes.range__thumbVolume : classes.range__thumb}
					style={{ left: `calc(${value}% - 4px)` }}
				></span>
			</div>
		</div>
	)
}

export default Range
