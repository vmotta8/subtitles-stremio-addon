/* eslint-disable no-unused-vars */
require('dotenv').config()
const OS = require('opensubtitles-api')
const axios = require('axios')
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

async function openSubtitles (data) {
  try {
    const OpenSubtitles = new OS({
      useragent: 'UserAgent',
      ssl: true
    })

    const query = {
      extensions: ['srt'],
      limit: '10',
      ...data
    }

    const subtitles = await OpenSubtitles.search(query)

    if (!Object.keys(subtitles).length) {
      console.log('No subtitles found')
      return null
    }

    return subtitles
  } catch (error) {
    console.log('Error on open subtitles method', error)
    return null
  }
}

function formatSubtitles (subtitles) {
  if (!subtitles) {
    console.log('No subtitles to format')
    return []
  }

  const languages = ['en', 'pb', 'pt']

  const formattedSubtitles = []
  languages.forEach(langCode => {
    let i = 0
    try {
      for (const data of subtitles[langCode]) {
        i++
        formattedSubtitles.push({
          id: `${langCode}-${i}`,
          url: data.utf8,
          lang: data.lang
        })
      }
    } catch (error) {
      console.log('Error on format subtitles method', error)
    }
  })

  return formattedSubtitles || []
}

async function translateSubtitles (formattedSubtitles) {
  const englishSubtitlesUrls = formattedSubtitles.map(subtitle => {
    if (subtitle?.id?.includes('en')) {
      return subtitle.url
    }
    return null
  })?.filter(Boolean)

  const translatedSubtitlesUrls = []
  try {
    // eslint-disable-next-line
    for (const [index, url] of englishSubtitlesUrls.entries()) {
      const englishSubtitleResponse = await axios.get(url)
      const subtitle = englishSubtitleResponse.data

      // TODO: implement translation

      const savedFileUrl = await uploadTranslatedSubtitleToS3(`translated_english_subtitle_${index + 1}.srt`, subtitle)
      translatedSubtitlesUrls.push(savedFileUrl)
      break
    }
  } catch (error) {
    console.log('Error on fetch and translate english subtitles', error)
  }

  const translatedSubtitles = translatedSubtitlesUrls.map((url, index) => {
    return {
      id: `translated-${index + 1}`,
      url,
      lang: 'Translated'
    }
  })

  return translatedSubtitles
}

async function uploadTranslatedSubtitleToS3 (key, subtitle) {
  const bucket = process.env.AWS_BUCKET_NAME
  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: subtitle
  }

  const getParams = {
    Bucket: bucket,
    Key: key
  }

  try {
    const uploadCommand = new PutObjectCommand(uploadParams)
    await s3Client.send(uploadCommand)

    const getCommand = new GetObjectCommand(getParams)
    const presignedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 })
    console.log('File uploaded successfully')

    return presignedUrl
  } catch (err) {
    console.error('File not uploaded', err)
  }
}

async function generateSubtitles (data) {
  const subtitles = await openSubtitles(data)
  const formattedSubtitles = formatSubtitles(subtitles)
  const translatedSubtitles = await translateSubtitles(formattedSubtitles)
  const subtitlesToReturn = [...formattedSubtitles, ...translatedSubtitles]
  console.log(`Found ${subtitlesToReturn.length} subtitles`)

  return subtitlesToReturn
}

module.exports = { generateSubtitles, formatSubtitles, translateSubtitles }
