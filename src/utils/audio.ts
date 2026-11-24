// Web Audio API Synthesizer for Loy Krathong Romantic Ambient Music & SFX
// 100% royalty-free, standalone, no external mp3 assets needed.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private volume: number = 0.6;
  private timerId: number | null = null;
  private waterNoiseNode: AudioNode | null = null;

  // Thai pentatonic / romantic lyrical notes in Hz (Eb Major pentatonic: Eb, F, G, Bb, C)
  private melodyNotes: number[] = [
    155.56, 174.61, 196.00, 233.08, 261.63, // Low octave
    311.13, 349.23, 392.00, 466.16, 523.25, // Mid octave
    622.25, 698.46, 783.99, 932.33, 1046.50 // High octave
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isAudioPlaying(): boolean {
    return this.isPlaying;
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startWaterAmbience();
    this.scheduleNextArpeggio();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.waterNoiseNode) {
      try {
        (this.waterNoiseNode as AudioBufferSourceNode).stop();
      } catch {
        // ignore
      }
      this.waterNoiseNode = null;
    }
  }

  // Soft flowing river stream background sound
  private startWaterAmbience() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise
        lastOut = output[i];
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const streamGain = this.ctx.createGain();
      streamGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(streamGain);
      streamGain.connect(this.masterGain);

      whiteNoise.start();
      this.waterNoiseNode = whiteNoise;
    } catch {
      // Audio buffer creation fallback
    }
  }

  // Play gentle bell / harp note
  private playHarpNote(freq: number, time: number, duration: number = 3.0, volumeScale: number = 0.15) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm harmonic overtone
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 0.8, time + duration);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(volumeScale, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + duration);
    osc2.stop(time + duration);
  }

  private scheduleNextArpeggio() {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    // Pick 3-5 gentle notes to simulate delicate water-reflected Thai melody / music box
    const noteCount = 3 + Math.floor(Math.random() * 3);
    const stepTime = 0.45;

    for (let i = 0; i < noteCount; i++) {
      const noteIdx = Math.floor(Math.random() * this.melodyNotes.length);
      const freq = this.melodyNotes[noteIdx];
      this.playHarpNote(freq, now + (i * stepTime), 3.5, 0.12);
    }

    // Occasional low root drone note
    if (Math.random() > 0.4) {
      this.playHarpNote(155.56, now, 5.0, 0.08); // Deep root note
    }

    const nextDelayMs = (noteCount * stepTime * 1000) + 1200 + Math.random() * 2000;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextArpeggio();
    }, nextDelayMs);
  }

  // Sound effect: Lighting the candle (gentle chime + spark whoosh)
  public playCandleIgnition() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Sparkle chime sequence
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    chimeFreqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 1.3);
    });

    // Soft warm whoosh
    const bufferSize = this.ctx.sampleRate * 0.6;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + 0.2);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
  }

  // Sound effect: Water splash / ripple when touching the river
  public playWaterRipple() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.25);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Sound effect: Button tap gentle bell
  public playSoftClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}

export const soundEngine = new SoundEngine();
