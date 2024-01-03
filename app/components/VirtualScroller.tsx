import React, { useState } from 'react'
import debounce from 'lodash.debounce'

type VirtualScrollerProps = {
	items: any[]
	itemHeight?: number
	bufferSize?: number
}

const VirtualScroller = ({ items, itemHeight = 175, bufferSize = 15 }: VirtualScrollerProps) => {
	const [scrollPosition, setScrollPosition] = useState(0)

	const visibleStartIndex = Math.max(0, Math.floor(scrollPosition / itemHeight) - bufferSize)
	const visibleEndIndex =
		typeof window !== 'undefined'
			? Math.min(items.length, visibleStartIndex + Math.ceil(window.innerHeight / itemHeight) + 2 * bufferSize)
			: items.length

	const visibleItems = items.slice(visibleStartIndex, visibleEndIndex)

	const handleScroll = debounce((e: any) => {
		setScrollPosition(e.target.scrollTop)
	}, 1)

	return (
		<div onScroll={handleScroll} className="overflow-auto h-screen relative">
			<div className="absolute w-full" style={{ top: visibleStartIndex * itemHeight }}>
				{visibleItems.map((item, index) => (
					<div key={index} className="w-full" style={{ height: itemHeight }}>
						{item}
					</div>
				))}
			</div>
		</div>
	)
}

export default VirtualScroller
