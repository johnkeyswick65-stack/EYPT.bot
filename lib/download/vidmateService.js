import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);
const DOWNLOAD_DIR = path.resolve('./downloads');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

/**
 * Busca música usando VidMate
 */
export async function searchVidmate(query) {
  try {
    console.log(`🔍 Buscando no VidMate: ${query}`);
    
    // Usar a API do VidMate
    const searchUrl = `https://vidmate.app/search?q=${encodeURIComponent(query)}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 15000
    });
    
    // Extrair IDs dos vídeos
    const videoIds = [];
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([^"']+)/g;
    let match;
    
    while ((match = regex.exec(response.data)) !== null) {
      if (!videoIds.includes(match[1])) {
        videoIds.push(match[1]);
      }
    }
    
    if (videoIds.length === 0) {
      throw new Error('Nenhum vídeo encontrado para: ' + query);
    }
    
    const videoId = videoIds[0];
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    console.log(`✅ Encontrado no VidMate: ${videoUrl}`);
    
    return {
      id: videoId,
      url: videoUrl,
      query: query
    };
  } catch (error) {
    console.error('❌ Erro na busca do VidMate:', error.message);
    throw new Error(`Não foi possível encontrar: ${query}`);
  }
}

/**
 * Baixa áudio usando VidMate
 */
export async function downloadAudioVidmate(url) {
  try {
    console.log(`🎵 Baixando áudio via VidMate...`);
    
    // Usar a API de download do VidMate
    const downloadUrl = `https://vidmate.app/download?url=${encodeURIComponent(url)}&format=mp3`;
    
    const response = await axios.get(downloadUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 30000
    });
    
    // Extrair link de download
    const regex = /<a[^>]+href="([^"]+)"[^>]*class="[^"]*download[^"]*"[^>]*>/i;
    const match = regex.exec(response.data);
    
    if (!match) {
      throw new Error('Link de download não encontrado');
    }
    
    const downloadLink = match[1];
    const filename = `musica_${Date.now()}.mp3`;
    const filePath = path.join(DOWNLOAD_DIR, filename);
    
    // Baixar o arquivo
    const fileResponse = await axios({
      method: 'GET',
      url: downloadLink,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const writer = createWriteStream(filePath);
    await streamPipeline(fileResponse.data, writer);
    
    console.log(`✅ Áudio baixado via VidMate: ${filename}`);
    
    return {
      path: filePath,
      filename: filename,
      title: 'Música'
    };
  } catch (error) {
    console.error('❌ Erro no download do VidMate:', error.message);
    throw new Error(`Erro no download via VidMate: ${error.message}`);
  }
}

export default {
  searchVidmate,
  downloadAudioVidmate
};
