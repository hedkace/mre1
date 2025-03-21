import express from 'express'
import tmx from 'tmx-parser'

const app = express()
app.use(express.json())

app.get('/test', (req,res)=>{
    res.json('test ok')
})

let map = null

async function main(){
    map = await new Promise((resolve, reject)=>{
        tmx.parseFile('./snowmap1.tmx', (err, loadedMap) => {
            if(err) return reject(err)
            resolve(loadedMap)
        })
    })
    console.log(map)
}

main()

app.get('/', (req,res)=>{
    res.json({success: !!map})
})


app.listen(4000)