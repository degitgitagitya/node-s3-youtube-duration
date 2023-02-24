const youtubedl = require('youtube-dl-exec')

const url = ''

async function main() {
    const data = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        youtubeSkipDashManifest: true,
        referer: url,
        writeInfoJson: true,
    })

    console.log(data.duration)
}

main()

module.exports = main
