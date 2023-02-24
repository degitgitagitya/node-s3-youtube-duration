const axios = require('axios')
const fs = require('fs')
const stream = require('stream')
const ffprobe = require('ffprobe')
const ffprobeStatic = require('ffprobe-static')

const { promisify } = require('util')

const url =
    'https://mydigilearn-dev.s3.ap-southeast-3.amazonaws.com/k9Wx03HWth2bfdzO2TY8/content/videos/video2023/2/2023224215214.mp4'

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
