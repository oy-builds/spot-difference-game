"use strict";
/* Tiny synthesized sound effects: every tone is generated with the WebAudio
   oscillator, so the game ships no audio files and stays fully offline.
   The context is created lazily on the first effect (after a user gesture),
   and every failure is swallowed — sound is garnish, never a blocker. */

export function createSoundEffects() {
  let context = null;

  function tone(frequency, startOffset, duration, type, volume) {
    try {
      if (!context) {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtor) return;
        context = new AudioCtor();
      }
      const start = context.currentTime + startOffset;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + duration);
    } catch {
      /* no audio available — play silently */
    }
  }

  return {
    playFoundChime() {
      tone(880, 0, 0.12, "sine", 0.12);
      tone(1318, 0.07, 0.16, "sine", 0.1);
    },
    playWrongBuzz() {
      tone(160, 0, 0.15, "square", 0.05);
    },
    playHintSparkle() {
      tone(1568, 0, 0.1, "triangle", 0.08);
      tone(2093, 0.06, 0.12, "triangle", 0.06);
    },
    playWinJingle() {
      tone(659, 0, 0.14, "sine", 0.11);
      tone(880, 0.12, 0.14, "sine", 0.11);
      tone(1109, 0.24, 0.14, "sine", 0.11);
      tone(1318, 0.36, 0.3, "sine", 0.12);
    }
  };
}
