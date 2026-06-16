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
    [174.61, 261.63, 329.63, 392.00, 440.00, 523.25], // Fmaj9 (F3, C4, E4, G4, A4, C5)
    [196.00, 293.66, 349.23, 440.00, 523.25, 659.25]  // G11 (G3, D4, F4, A4, C5, E5)
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
      // デフォルトは消音状態に合わせる。最大値を0.5にしてはっきり聞こえる音量感にする
      this.masterGain.gain.setValueAtTime(this.isMutedState ? 0 : 0.5, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // BGM用ボリューム (全体的にしっかり届く音量に変更)
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    } catch (e) {
      console.error("Failed to initialize Web Audio Context", e);
    }
  }

  private async ensureActive(): Promise<boolean> {
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        console.error("Failed to resume AudioContext", e);
        return false;
      }
    }
    return true;
  }

  public async setMuted(muted: boolean) {
    this.isMutedState = muted;
    const active = await this.ensureActive();
    if (!active || !this.masterGain || !this.ctx) return;

    const targetVolume = muted ? 0 : 0.48; // 聴き取りやすい、心地よい音量に設定
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
  public async playClick() {
    const active = await this.ensureActive();
    if (!active || this.isMutedState || !this.masterGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1150, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.2);

      gainNode.gain.setValueAtTime(0.24, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.21);
    } catch {}
  }

  // お磨き中（きゅっきゅという短い、可愛いきらきら感のあるサインスイープ）
  public async playPolish() {
    const active = await this.ensureActive();
    if (!active || this.isMutedState || !this.masterGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      // 磨く速度を表現するために少し上昇/下降する周波数
      const baseFreq = 480 + Math.random() * 240;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.1);

      gainNode.gain.setValueAtTime(0.18, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {}
  }

  // キラキラ感のある完了音
  public async playShine() {
    const active = await this.ensureActive();
    if (!active || this.isMutedState || !this.masterGain || !this.ctx) return;
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
        gainNode.gain.linearRampToValueAtTime(0.16, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.5);
      });
    } catch {}
  }

  // 結果発表時の、神秘的で豊かで壮大なクリスタルベルチャイム
  public async playResult() {
    const active = await this.ensureActive();
    if (!active || this.isMutedState || !this.masterGain || !this.ctx) return;
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
        gainNode.gain.linearRampToValueAtTime(0.11, time + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 2.8); // 2.8秒かけてゆっくり消える

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + 3.2);
      });
    } catch {}
  }
  public async startBGM() {
    const active = await this.ensureActive();
    if (!active || this.isMutedState) return;
    await this.startBGMInternal();
  }

  private async startBGMInternal() {
    const active = await this.ensureActive();
    if (!active || !this.ctx || !this.bgmGain) return;
    if (this.bgmIntervalId) return;

    // 和音フェードイン/アウトを 5秒ごとに繰り返すアンビエントシーケンサー
    const triggerNextChord = () => {
      if (this.isMutedState || !this.ctx || !this.bgmGain) return;
      const now = this.ctx.currentTime;
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

          // 天然水晶のようなゆらめき・デチューン和音を最も澄んだ音で奏でられます。
          osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

          gainNode.gain.setValueAtTime(0, now);
          // 2秒かけてゆっくりフェードインして包み込む
          gainNode.gain.linearRampToValueAtTime(0.065, now + 2.0);

          osc.connect(gainNode);
          gainNode.connect(this.bgmGain!);

          osc.start(now);
          this.bgmOscillators.push({ osc, gain: gainNode });
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
