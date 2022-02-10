import 'dotenv/config'
import express from 'express'
import axios from 'axios'

import logger from './logger.js'

const log = logger.child({ label: 'app' })

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send(`Hello, ${process.env.TEST_VALUE}!`)
})

app.get('/stonks/:ticker', async (req, res) => {
	const tickerName = req.params.ticker.toUpperCase()

	const result = await axios(`https://api.polygon.io/v2/aggs/ticker/${tickerName}/range/1/hour/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120`, {
		headers: {
			Authorization: `Bearer ${process.env.POLYGON_API_KEY}`
		}
	})

	const closePrice = result.data.results[0].c
	
	log.info(`${tickerName} value: ${closePrice}`)
	res.send(`close price: ${closePrice}`)
})


app.listen(3000, () => {
	log.info('Server listening on port 3000')
})