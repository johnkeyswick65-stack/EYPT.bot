import axios from 'axios';
import { downloadAudio } from './downloadManager.js';

export async function searchMusic(query) {
  try {
    console.log(`🔍 Buscando: ${query}`);
    
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 15000
    });
    
    const videoIds = [];
    const regex = /"videoId":"([^"]+)"/g;
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
    
    console.log(`✅ Encontrado: ${videoUrl}`);
    
    return {
      id: videoId,
      url: videoUrl,
      query: query
    };
  } catch (error) {
    console.error('❌ Erro na busca:', error.message);
    throw new Error(`Não foi possível encontrar: ${query}`);
  }
}

export async function downloadMusicFromQuery(query) {
  try {
    const musicInfo = await searchMusic(query);
    const result = await downloadAudio(musicInfo.url);
    return { ...result, ...musicInfo };
  } catch (error) {
    console.error('❌ Erro no download da música:', error.message);
    throw new Error(`Erro ao baixar música: ${error.message}`);
  }
}

export default {
  searchMusic,
  downloadMusicFromQuery
};
