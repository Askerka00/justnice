import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const WHISPER_CLI = '/Users/aibolat/Tools/whisper.cpp/build/bin/whisper-cli';
const WHISPER_MODEL = '/Users/aibolat/Tools/whisper.cpp/models/ggml-base.bin';

export default defineEventHandler(async (event) => {
  // Parse multipart form data
  const formData = await readMultipartFormData(event);
  
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No audio file uploaded' });
  }

  const audioFile = formData.find(f => f.name === 'audio');
  if (!audioFile || !audioFile.data) {
    throw createError({ statusCode: 400, statusMessage: 'Missing "audio" field in form data' });
  }

  const lang = formData.find(f => f.name === 'lang')?.data?.toString() || 'ru';

  // Save uploaded file to temp
  const ext = audioFile.filename?.split('.').pop() || 'ogg';
  const tempInput = path.join(os.tmpdir(), `whisper_input_${Date.now()}.${ext}`);
  const tempWav = path.join(os.tmpdir(), `whisper_wav_${Date.now()}.wav`);

  try {
    // Write uploaded data to temp file
    fs.writeFileSync(tempInput, audioFile.data);

    // Convert to WAV 16kHz mono with ffmpeg
    execSync(`ffmpeg -i "${tempInput}" -ar 16000 -ac 1 -c:a pcm_s16le "${tempWav}" -y -loglevel error`, {
      timeout: 30000
    });

    // Run whisper-cli
    const output = execSync(
      `"${WHISPER_CLI}" -m "${WHISPER_MODEL}" -l ${lang} -f "${tempWav}" --no-timestamps -t 4`,
      { timeout: 60000, encoding: 'utf8' }
    );

    // Parse output: whisper outputs text lines, filter out empty/log lines
    const text = output
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('whisper_') && !line.startsWith('ggml_') && !line.startsWith('metal_'))
      .join(' ')
      .trim();

    return { success: true, text };
  } catch (e: any) {
    console.error('Transcription error:', e.message);
    throw createError({
      statusCode: 500,
      statusMessage: `Transcription failed: ${e.message}`
    });
  } finally {
    // Cleanup temp files
    try { fs.unlinkSync(tempInput); } catch {}
    try { fs.unlinkSync(tempWav); } catch {}
  }
});
