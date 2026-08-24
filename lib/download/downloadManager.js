import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { execFile } from 'child_process';

const execFileAsync = promisify(execFile);
const streamPipeline = promisify(pipeline);

const DOWNLOAD_DIR = path.resolve('./downloads');
const YTDLP = 'yt-dlp';

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

export async function downloadFile(url, filename) {
  try {
    console.log(`📥 Baixando: ${url}`);

    const response = await axios({
      method: 'GET',
      url,
      responseType: 'stream',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const filePath = path.join(DOWNLOAD_DIR, filename);
    const writer = createWriteStream(filePath);

    await streamPipeline(response.data, writer);

    console.log(`✅ Download concluído: ${filename}`);
    return filePath;
  } catch (error) {
    console.error('❌ Erro no download:', error.message);
    throw new Error(`Falha ao baixar: ${error.message}`);
  }
}

export async function downloadImage(url) {
  const timestamp = Date.now();
  const filename = `imagem_${timestamp}.jpg`;
  return downloadFile(url, filename);
}

async function findDownloadedFile(prefix, timestamp) {
  const files = fs.readdirSync(DOWNLOAD_DIR);

  const file = files.find(
    f => f.startsWith(`${prefix}_${timestamp}.`)
  );

  if (!file) {
    throw new Error('Arquivo não encontrado após o download');
  }

  return path.join(DOWNLOAD_DIR, file);
}

export async function downloadVideo(query) {
  try {
    console.log('🎬 Baixando vídeo com yt-dlp...')

    const timestamp = Date.now()
    const outputTemplate = path.join(
      DOWNLOAD_DIR,
      `video_${timestamp}.%(ext)s`
    )

    const isUrl = /^https?:\/\//i.test(query.trim())

    const target = isUrl
      ? query.trim()
      : `ytsearch1:${query.trim()}`

    console.log(`🔎 Origem: ${target}`)

    const args = [
      '--js-runtimes',
      'node',
      '--no-playlist',
      '--no-warnings',
      '--retries',
      '3',
      '--fragment-retries',
      '3',
      '--socket-timeout',
      '30',
      '-f',
      '18/bv*+ba/b',
      '--merge-output-format',
      'mp4',
      '--print',
      'after_move:filepath',
      '-o',
      outputTemplate,
      target
    ]

    console.log(`📝 yt-dlp ${args.join(' ')}`)

    const { stdout, stderr } = await execFileAsync(YTDLP, args, {
      maxBuffer: 20 * 1024 * 1024
    })

    if (stdout) console.log(stdout)
    if (stderr) console.log('ℹ️ yt-dlp:', stderr)

    let filePath = null

    const printedPath = stdout
      ?.split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .pop()

    if (printedPath && fs.existsSync(printedPath)) {
      filePath = printedPath
    }

    if (!filePath) {
      filePath = await findDownloadedFile('video', timestamp)
    }

    if (!fs.existsSync(filePath)) {
      throw new Error('O vídeo foi processado, mas o arquivo não foi encontrado.')
    }

    const filename = path.basename(filePath)

    console.log(`✅ Vídeo pronto: ${filename}`)

    return {
      path: filePath,
      filename,
      title: isUrl ? 'Vídeo' : query.trim(),
      duration: 0
    }

  } catch (error) {
    console.error('❌ Erro ao baixar vídeo:', error.message)

    throw new Error(
      `Erro no vídeo: ${error.message}`
    )
  }
}

export async function downloadAudio(url) {
  try {
    console.log('🎵 Baixando áudio com yt-dlp...');

    const timestamp = Date.now();
    const outputTemplate = path.join(
      DOWNLOAD_DIR,
      `audio_${timestamp}.%(ext)s`
    );

    const args = [
      '--js-runtimes',
      'node',
      '--no-playlist',
      '--no-warnings',
      '--retries',
      '3',
      '--fragment-retries',
      '3',
      '--socket-timeout',
      '30',
      '-f',
      'ba/b',
      '-x',
      '--audio-format',
      'mp3',
      '--audio-quality',
      '128K',
      '-o',
      outputTemplate,
      url
    ];

    console.log(`📝 yt-dlp ${args.join(' ')}`);

    const { stdout, stderr } = await execFileAsync(YTDLP, args, {
      maxBuffer: 20 * 1024 * 1024
    });

    if (stdout) console.log(stdout);
    if (stderr) console.log('ℹ️ yt-dlp:', stderr);

    const filePath = await findDownloadedFile('audio', timestamp);
    const filename = path.basename(filePath);

    if (!fs.existsSync(filePath)) {
      throw new Error('Arquivo MP3 não encontrado após o download.');
    }

    const stats = fs.statSync(filePath);

    if (stats.size === 0) {
      throw new Error('O arquivo MP3 foi criado vazio.');
    }

    console.log(`✅ Áudio pronto: ${filename}`);
    console.log(`📦 Tamanho: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    return {
      path: filePath,
      filename,
      title: 'Música',
      duration: 0
    };

  } catch (error) {
    console.error('❌ Erro ao baixar áudio:', error.message);
    throw new Error(`Erro no áudio: ${error.message}`);
  }
}

export default {
  downloadFile,
  downloadImage,
  downloadVideo,
  downloadAudio,
  DOWNLOAD_DIR
};
