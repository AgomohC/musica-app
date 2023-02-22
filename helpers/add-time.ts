function zeroPad(num: number): string {
	var str = num?.toString()
	if (str?.length < 2) {
		return "0" + str
	}
	return str
}

// assuming your time strings will always be (H*:)(m{0,2}:)s{0,2} and never negative
export function totalTimeString(timeStrings: string[]): string {
	var totals = timeStrings?.reduce(
		function (a, timeString) {
			var parts = timeString?.split(":")
			var temp
			if (parts.length > 0) {
				temp = Number(parts?.pop()) + a.seconds
				a.seconds = temp % 60
				if (parts.length > 0) {
					temp = Number(parts?.pop()) + a.minutes + (temp - a.seconds) / 60
					a.minutes = temp % 60
					a.hours = a.hours + (temp - a.minutes) / 60
					if (parts.length > 0) {
						a.hours += Number(parts?.pop())
					}
				}
			}

			return a
		},
		{
			hours: 0,
			minutes: 0,
			seconds: 0,
		}
	)

	// returned string will be HH(H+):mm:ss
	return [zeroPad(totals?.hours), zeroPad(totals?.minutes), zeroPad(totals?.seconds)].join(":")
}
