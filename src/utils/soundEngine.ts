// Native Web Audio API sound synthesizer for Porsche acoustic experience

class PorscheSoundEngine {
  private ctx: AudioContext | null = null;
  private isRevving = false;
  private activeOscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play subtle luxury tactile feedback click
  public playClick(pitch = 800) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play Flat-6 Engine Start & Idle Rev
  public playEngineRev(onRpmChange?: (rpm: number) => void) {
    try {
      this.initContext();
      if (!this.ctx || this.isRevving) return;
      this.isRevving = true;

      const now = this.ctx.currentTime;
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, now);
      masterGain.connect(this.ctx.destination);

      // Multi-cylinder harmonic oscillators simulating a flat-six boxer engine
      const baseFreq = 55; // 850 RPM base fundamental
      const harmonics = [1, 2, 3, 4.5, 6];
      const oscillators: OscillatorNode[] = [];

      harmonics.forEach((harmonic, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * harmonic, now);

        // Rev curve up to 8,200 RPM, then idle down with exhaust burbles
        osc.frequency.linearRampToValueAtTime(baseFreq * harmonic * 1.5, now + 0.4);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * harmonic * 4.2, now + 1.1);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * harmonic * 1.1, now + 2.3);

        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.08 / (idx + 1), now);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 2.6);
        oscillators.push(osc);
      });

      // Filter to simulate exhaust muffler and manifold resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.linearRampToValueAtTime(2800, now + 1.1);
      filter.frequency.exponentialRampToValueAtTime(600, now + 2.4);

      // RPM telemetry callback simulation for UI needle
      const startTime = performance.now();
      const updateTelemetry = () => {
        const elapsed = (performance.now() - startTime) / 1000;
        let rpm = 850;
        if (elapsed < 0.4) {
          rpm = 850 + (elapsed / 0.4) * 800;
        } else if (elapsed < 1.1) {
          const t = (elapsed - 0.4) / 0.7;
          rpm = 1650 + t * t * (8400 - 1650);
        } else if (elapsed < 2.4) {
          const t = (elapsed - 1.1) / 1.3;
          rpm = 8400 - Math.pow(t, 0.6) * (8400 - 850);
        } else {
          rpm = 850;
        }

        if (onRpmChange) onRpmChange(Math.round(rpm));

        if (elapsed < 2.5) {
          requestAnimationFrame(updateTelemetry);
        } else {
          this.isRevving = false;
          if (onRpmChange) onRpmChange(0);
        }
      };

      requestAnimationFrame(updateTelemetry);
    } catch {
      this.isRevving = false;
    }
  }
}

export const soundEngine = new PorscheSoundEngine();
