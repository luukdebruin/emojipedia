import React from 'react'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import styles from './styles/app.css?inline'
import { LinksFunction } from '@remix-run/node'

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-secondary-foreground">
				<Outlet />
				<ScrollRestoration />
				<LiveReload />
				<Scripts />
			</body>
		</html>
	)
}
