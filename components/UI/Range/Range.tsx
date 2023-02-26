import classes from "./Range.module.scss"
import classNames from "classnames"

interface IPropTypes {
	className?: string
	onChange: React.ChangeEventHandler
	value: number
}

const Range = ({ className, onChange, value }: IPropTypes) => {
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
					className={classes.range__thumb}
					style={{ left: `calc(${value}% - 4px)` }}
				></span>
			</div>
		</div>
	)
}

export default Range
