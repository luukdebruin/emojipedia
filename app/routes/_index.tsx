import React, { useEffect, useState } from 'react'
import { json, LoaderFunction, type MetaFunction } from '@remix-run/node'
import { emojis } from '~/data/emojis'
import { useLoaderData } from '@remix-run/react'
import VirtualScroller from '~/components/VirtualScroller'
import { Input } from '~/components/ui/input'

const ITEM_WIDTH = 250

const chunkArray = (array: any[], size: number) => {
	const chunked = []
	for (let i = 0; i < array.length; i += size) {
		chunked.push(array.slice(i, i + size))
	}
	return chunked
}

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export const loader: LoaderFunction = () => {
	return json({ emojis })
}

export default function Index() {
	const { emojis } = useLoaderData<typeof loader>()
	const [search, setSearch] = useState('')
	const [windowWidth, setWindowWidth] = useState(0)
	const [numItems, setNumItems] = useState(6)

	useEffect(() => {
		setWindowWidth(window.innerWidth)

		const handleResize = () => {
			setWindowWidth(window.innerWidth)
			setNumItems(Math.floor(window.innerWidth / ITEM_WIDTH))
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const filteredEmojis = emojis.filter((emoji: any) => {
		const searchLower = search.toLowerCase()
		return (
			emoji.description.toLowerCase().includes(searchLower) ||
			emoji.category.toLowerCase().includes(searchLower) ||
			emoji.aliases.some((alias: string) => alias.toLowerCase().includes(searchLower)) ||
			emoji.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
		)
	})

	const rows = chunkArray(filteredEmojis, numItems)

	return (
		<div className="w-screen h-screen relative">
			<div className="fixed bottom-0 z-10 flex justify-center items-center py-8 w-full bg-gradient-to-t from-secondary-foreground">
				<Input
					className="w-auto"
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search emojis..."
				/>
			</div>
			<VirtualScroller
				itemHeight={windowWidth / numItems}
				items={rows.map((row, rowIndex) => (
					<div key={rowIndex} className="flex w-full items-center">
						{row.map((emoji: any) => (
							<span
								key={emoji.emoji}
								className="flex-[1] flex justify-center items-center text-9xl bg-primary-foreground aspect-square cursor-pointer hover:bg-accent-foreground rounded-lg m-[1px]"
								onClick={() => {
									navigator.clipboard.writeText(emoji.emoji)
								}}
							>
								{emoji.emoji}
							</span>
						))}
					</div>
				))}
			/>
		</div>
	)
}
