const axios = require('axios')
const fs = require('fs')
const stream = require('stream')
const ffprobe = require('ffprobe')
const ffprobeStatic = require('ffprobe-static')

const { promisify } = require('util')

const url = ''

async function main() {
    const finishedDownload = promisify(stream.finished)

    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    })

    const splittedUrl = url.split('/')
    const fileName = splittedUrl[splittedUrl.length - 1]

    const writer = fs.createWriteStream(fileName)

    response.data.pipe(writer)
    await finishedDownload(writer)

    const info = await ffprobe(fileName, {
        path: ffprobeStatic.path,
    })

    fs.unlinkSync(fileName)

    console.log(info)
}

main()

module.exports = main
