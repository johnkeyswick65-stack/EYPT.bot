import 'dotenv/config';
import { exec } from 'child_process';
import fs from 'fs';
import { connectToWhatsApp } from './lib/connection/whatsapp.js';

console.log('🤖 Iniciando EYPT.bot...');
connectToWhatsApp();

