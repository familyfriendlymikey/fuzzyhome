import express from 'express'
import index from './app/index.html'
const app = express!
app.get(/.*/) do(req,res)
	unless req.accepts(['image/*', 'html']) == 'html'
		return res.sendStatus(404)
	res.send index.body
imba.serve app.listen(process.env.PORT or 3000)