// Web Audio API を用いた、外部ロード不要のクリスタルシンセサイザー・サウンドシステム
class SoundManagerClass {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private isMutedState: boolean = true; // デフォルトは音量オフ（消音）
  private bgmIntervalId: any = null;
  private bgmOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private currentBgmChordIndex: number = 0;

  // 美しいアンビエント・パッド進行用の和音 (周波数リスト)
  // Cmaj9, Am9, Fmaj9, G11 などの透き通った音階
  private bgmChords: number[][] = [
    [130.81, 195.99, 261.63, 329.63, 493.88, 587.33], // Cmaj9 (C3, G3, C4, E4, B4, D5)
    [110.00, 164.81, 220.00, 293.66, 349.23, 440.00], // Am9/F (F, C, A, D, E, A)
    [174.61, 261.63, 349.23, 440.00, 523.25, 659.25], // Fmaj9 (F3, C4, F4, A4, C5, E5)
    [146.83, 220.00, 293.66, 392.00, 440.00, 587.33]  // G11 (G3, D4, G4, B4, D5, A5)
  ];

  constructor() {
    // ユーザーインタラクションのタイミングで初期化（ブラウザポリシー対策）
  }

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      // デフォルトは消音状態に合わせる
      this.masterGain.gain.setValueAtTime(this.isMutedState ? 0 : 0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // BGM用ボリューム
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.12, this.ctx.currentTime); // BGMは少し控えめに
      this.bgmGain.connect(this.masterGain);
    } catch (e) {
      console.error("Failed to initialize Web Audio Context", e);
    }
  }

  public setMuted(muted: boolean) {
    this.isMutedState = muted;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const targetVolume = muted ? 0 : 0.22; // 自然な最大音量
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(targetVolume, this.ctx.currentTime + 0.3); // 0.3秒でなめらかにフェードイン/アウト

    if (!muted) {
      this.startBGMInternal();
    }
  }

  public isMuted(): boolean {
    return this.isMutedState;
  }

  // クリック時のきらっとした高音 (三角波 + 短いリリースのきらきらベル音)
  public playClick() {
    this.init();
    if (!this.ctx || this.isMutedState || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);

      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  // お磨き中（きゅっきゅという短い、可愛いきらきら感のあるサインスイープ）
  public playPolish() {
    this.init();
    if (!this.ctx || this.isMutedState || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      // 磨く速度を表現するために少し上昇/下降する周波数
      const baseFreq = 500 + Math.random() * 300;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);

      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }

  // キラキラ感のある完了音
  public playShine() {
    this.init();
    if (!this.ctx || this.isMutedState || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      // 3音のアルペジオが高速に立ち上がる
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const time = now + idx * 0.05;
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(0.0, time);
        gainNode.gain.linearRampToValueAtTime(0.06, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.45);
      });
    } catch {}
  }

  // 結果発表時の、神秘的で豊かで壮大なクリスタルベルチャイム
  public playResult() {
    this.init();
    if (!this.ctx || this.isMutedState || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      // 美しい響きのGmaj9和音
      const rootChords = [195.99, 293.66, 369.99, 440.00, 587.33, 739.99, 880.00]; // G3, D4, F#4, A4, D5, F#5, A5
      
      rootChords.forEach((freq, idx) => {
        // アルペジオ状にわずかに遅らせて発音
        const time = now + (idx * 0.1);
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        // 正弦波にわずかな三角波を混ぜてきらきら感を出す
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(0.0, time);
        gainNode.gain.linearRampToValueAtTime(0.04, time + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 2.5); // 2.5秒かけてゆっくり消える

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + 3.0);
      });
    } catch {}
  }

  public startBGM() {
    this.init();
    if (this.isMutedState) return;
    this.startBGMInternal();
  }

  private startBGMInternal() {
    if (!this.ctx || !this.bgmGain) return;
    if (this.bgmIntervalId) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // 和音フェードイン/アウトを 5秒ごとに繰り返すアンビエントシーケンサー
    const triggerNextChord = () => {
      const now = this.ctx!.currentTime;
      const duration = 6.0; // ひとつのコードの長さ (6秒)
      const chord = this.bgmChords[this.currentBgmChordIndex];
      
      // 既存のBGM用オシレーターを消去
      const oldOscs = [...this.bgmOscillators];
      this.bgmOscillators = [];

      // 古いオシレーターをなめらかにフェードアウト
      oldOscs.forEach(({ osc, gain }) => {
        try {
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0, now + 1.2);
          setTimeout(() => {
            try { osc.stop(); } catch {}
          }, 1500);
        } catch {}
      });

      // 新しい和音のオシレーターを生成してフェードイン
      chord.forEach((freq) => {
        try {
          const osc = this.ctx!.createOscillator();
          const gainNode = this.ctx!.createGain();

          osc.type = 'sine'; // ピュアで神秘的な正弦波
          osc.frequency.setValueAtTime(freq, now);

          // わずかな揺らぎ (モジュレーション) を加えて神秘性を出す
          const lfo = this.ctx!.createOscillator();
          const lfoGain = this.ctx!.createGain();
          lfo.frequency.setValueAtTime(0.2 + Math.random() * 0.1, now); // とてもゆっくりなLFO
          lfoGain.gain.setValueAtTime(0.7, now); // 揺らぎの幅
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start(now);

          gainNode.gain.setValueAtTime(0, now);
          // 2秒かけてゆっくりフェードイン
          gainNode.gain.linearRampToValueAtTime(0.022, now + 2.0);

          osc.connect(gainNode);
          gainNode.connect(this.bgmGain!);

          osc.start(now);
          
          this.bgmOscillators.push({ osc, gain: gainNode });

          // LFOクリーンアップ
          setTimeout(() => {
            try { lfo.stop(); } catch {}
          }, (duration + 2) * 1000);
        } catch {}
      });

      // 次のコードへインデックスを進める
      this.currentBgmChordIndex = (this.currentBgmChordIndex + 1) % this.bgmChords.length;
    };

    // 初回実行
    triggerNextChord();
    // 5.2秒ごとにシームレスに次のコードをトリガー (重なりを作るため)
    this.bgmIntervalId = setInterval(triggerNextChord, 5200);
  }

  public stopBGM() {
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }

    const now = this.ctx ? this.ctx.currentTime : 0;
    this.bgmOscillators.forEach(({ osc, gain }) => {
      try {
        if (this.ctx) {
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0, now + 0.8);
          setTimeout(() => {
            try { osc.stop(); } catch {}
          }, 1000);
        } else {
          osc.stop();
        }
      } catch {}
    });
    this.bgmOscillators = [];
  }
}

export const SoundManager = new SoundManagerClass();
