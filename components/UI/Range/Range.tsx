import classes from "./Range.module.scss"
import classNames from "classnames"
import { forwardRef } from "react"

interface IPropTypes {
	className?: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	value: number
	min: number
	max: number
}

const Range = forwardRef<HTMLDivElement, IPropTypes>(function (
	{ className, onChange, value, min, max },
	ref
) {
	const clsx = classNames(className, classes.range)
	var FIREFOX = /Firefox/i.test(navigator.userAgent)

	return (
		<div className={clsx}>
			<div
				style={{
					width: `${(value / max) * 100}%`,
					display: `${FIREFOX ? "none" : "block"}`,
				}}
				className={classes.range__indicator}
			></div>
			<input
				type='range'
				className={classes.r}
				value={value}
				min={min}
				max={max}
				onChange={onChange}
			/>
		</div>
	)
})
Range.displayName = "Range"
export default Range
