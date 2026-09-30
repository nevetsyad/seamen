// Seamen - The Daily Dive (pervy & funny version)
// A daily word-descending game inspired by Krillion, but... hornier

import { prompts, themedPrompts, rarityTiers, oceanZones } from './data/prompts.js';
import { createBubbles } from './effects/bubbles.js';
import { playSound } from './effects/audio.js';

class SeamenGame {
  constructor() {
    this.depth = 0;
    this.maxDepth = 0;
    this.score = 0;
    this.promptIndex = 0;
    this.totalPrompts = 7;
    this.timePerPrompt = 25;
    this.timeLeft = this.timePerPrompt;
    this.timerId = null;
    this.currentPrompt = null;
    this.soundEnabled = true;
    this.vibrationEnabled = true;
    this.highContrast = false;
    this.reducedMotion = false;
    this.rarestAnswer = null;
    this.rarestRarity = 0;
    this.friendMood = 'horny';
    this.prompts = prompts;

    this.cacheElements();
    this.bindEvents();
    this.init();
  }

  cacheElements() {
    this.el = {
      oceanBg: document.getElementById('ocean-bg'),
      bubbles: document.getElementById('bubbles'),
      depthValue: document.getElementById('depth-value'),
      depthLabel: document.getElementById('depth-label'),
      depthBarFill: document.getElementById('depth-bar-fill'),
      maxDepthDisplay: document.getElementById('max-depth'),
      scoreValue: document.getElementById('score-value'),
      promptsValue: document.getElementById('prompts-value'),
      rarityValue: document.getElementById('rarity-value'),
      zoneName: document.getElementById('zone-name'),
      zoneDepth: document.getElementById('zone-depth'),
      friend: document.getElementById('friend'),
      friendImg: document.getElementById('friend-img'),
      friendMessage: document.getElementById('friend-message'),
      beginScreen: document.getElementById('begin-screen'),
      beginBtn: document.getElementById('begin-btn'),
      promptCard: document.getElementById('prompt-card'),
      promptNumber: document.getElementById('prompt-number'),
      promptText: document.getElementById('prompt-text'),
      options: document.getElementById('options'),
      timer: document.getElementById('timer'),
      diveSummary: document.getElementById('dive-summary'),
      finalDepth: document.getElementById('final-depth'),
      finalScore: document.getElementById('final-score'),
      finalMaxDepth: document.getElementById('final-max-depth'),
      finalRarity: document.getElementById('final-rarity'),
      finalZone: document.getElementById('final-zone'),
      playAgainBtn: document.getElementById('play-again-btn'),
      menuBtn: document.getElementById('menu-btn'),
      settingsBtn: document.getElementById('settings-btn'),
      menuOverlay: document.getElementById('menu-overlay'),
      settingsOverlay: document.getElementById('settings-overlay'),
      wardrobeOverlay: document.getElementById('wardrobe-overlay'),
      howToPlay: document.getElementById('how-to-play'),
      howToToggle: document.getElementById('how-to-toggle'),
      soundEnabled: document.getElementById('sound-enabled'),
      vibrationEnabled: document.getElementById('vibration-enabled'),
      highContrast: document.getElementById('high-contrast'),
      reducedMotion: document.getElementById('reduced-motion'),
      closeMenuBtn: document.getElementById('close-menu-btn'),
      closeSettingsBtn: document.getElementById('close-settings-btn'),
      closeWardrobeBtn: document.getElementById('close-wardrobe-btn'),
      pervyBadge: document.querySelector('.pervy-badge'),
    };
    // Add pervy badge if not present
    if (!this.el.pervyBadge) {
      const badge = document.createElement('span');
      badge.className = 'pervy-badge';
      badge.textContent = 'PERVY MODE';
      // Insert after begin button or somewhere visible
      const header = document.querySelector('.header');
      if (header) {
        header.insertBefore(badge, header.firstChild);
      }
    }
  }

  bindEvents() {
    this.el.beginBtn?.addEventListener('click', () => this.startDive());
    this.el.playAgainBtn?.addEventListener('click', () => this.startDive());
    this.el.menuBtn?.addEventListener('click', () => this.toggleMenu(true));
    this.el.settingsBtn?.addEventListener('click', () => this.toggleMenu(false, true));
    this.el.closeMenuBtn?.addEventListener('click', () => this.toggleMenu(false));
    this.el.closeSettingsBtn?.addEventListener('click', () => this.toggleSettings(false));
    this.el.howToToggle?.addEventListener('click', () => {
      this.el.howToPlay.classList.toggle('collapsed');
    });
    this.el.soundEnabled?.addEventListener('change', (e) => {
      this.soundEnabled = e.target.checked;
    });
    this.el.vibrationEnabled?.addEventListener('change', (e) => {
      this.vibrationEnabled = e.target.checked;
    });
    this.el.highContrast?.addEventListener('change', (e) => {
      this.highContrast = e.target.checked;
      this.applyHighContrast();
    });
    this.el.reducedMotion?.addEventListener('change', (e) => {
      this.reducedMotion = e.target.checked;
      document.body.classList.toggle('reduced-motion', e.target.checked);
    });
  }

  init() {
    createBubbles(this.el.bubbles);
    this.updateDepth(0);
    this.updateDisplay();
    this.updateFriend('horny', 'Ahoy there, sailor... ready to sink some depths?');
    this.updateTimerDisplay();
  }

  toggleMenu(show, showSettings = false) {
    if (show) {
      this.el.menuOverlay.classList.add('active');
    } else {
      this.el.menuOverlay.classList.remove('active');
    }
    if (showSettings) {
      this.el.settingsOverlay.style.display = 'block';
      this.el.settingsOverlay.classList.add('active');
    }
  }

  toggleSettings(show) {
    this.el.settingsOverlay.style.display = show ? 'block' : 'none';
    if (!show) {
      this.el.settingsOverlay.classList.remove('active');
    }
  }

  applyHighContrast() {
    document.body.classList.toggle('high-contrast', this.highContrast);
  }

  startDive() {
    playSound('bubble', this.soundEnabled);
    this.depth = 0;
    this.score = 0;
    this.promptIndex = 0;
    this.maxDepth = 0;
    this.rarestAnswer = null;
    this.rarestRarity = 0;
    this.friendMood = 'horndog';

    this.el.beginScreen.style.display = 'none';
    this.el.diveSummary.style.display = 'none';
    this.el.promptCard.style.display = 'block';
    this.el.timer.style.display = 'block';

    this.updateDisplay();
    this.showFriendIntro();
    this.loadPrompt();
  }

  showFriendIntro() {
    this.updateFriend('horney', 'Diving in 3... lubed up and ready!');
    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        this.updateFriend('horney', `Diving in ${count}... lube not included!`);
      } else {
        clearInterval(interval);
        this.updateFriend('horney', "Let's go, sailor! Don't forget to stroke the depth gauge!");
        playSound('whoosh', this.soundEnabled);
        this.startPrompt();
      }
    }, 600);
  }

  startPrompt() {
    this.timeLeft = this.timePerPrompt;
    this.updateTimerDisplay();

    this.timerId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timerId);
        this.timeUp();
      } else {
        this.updateTimerDisplay();
        if (this.timeLeft <= 5) {
          playSound('tick', this.soundEnabled);
        }
      }
    }, 1000);
  }

  timeUp() {
    playSound('timeout', this.soundEnabled);
    this.vibrate();
    this.updateFriend('embarrassed', "Oh no, you blew your load before the surface... er, I mean, time ran out!");
    this.selectOption(null);
  }

  loadPrompt() {
    const todayIndex = this.getDailyIndex();
    const shuffledIndices = this.shuffleIndices(this.prompts.length, todayIndex);
    const promptData = this.prompts[shuffledIndices[this.promptIndex]] || this.prompts[0];

    this.currentPrompt = promptData;
    this.el.promptNumber.textContent = `PROMPT ${this.promptIndex + 1} OF ${this.totalPrompts}`;
    this.el.promptText.textContent = promptData.question;

    this.el.options.innerHTML = '';
    const shuffledOptions = this.shuffleArray([...promptData.answers]);

    shuffledOptions.forEach((answer, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = answer.text;
      btn.onclick = () => this.selectOption(answer);
      btn.dataset.rarity = answer.rarity;

      setTimeout(() => {
        btn.style.display = 'block';
      }, idx * 100);

      this.el.options.appendChild(btn);
    });

    this.startPrompt();
  }

  selectOption(answer) {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    this.el.timer.style.display = 'none';
    this.el.options.innerHTML = '';
    this.el.promptCard.style.display = 'none';

    if (!answer) {
      this.updateFriend('embarrassed', "The depths call to those who... hesitate too long!");
      this.descend(0, 'timeout');
      this.afterAnswer();
      return;
    }

    const rarityInfo = rarityTiers[answer.rarity];
    this.updateFriend('happy', `"${answer.text}" — nice choice! Deeper we go... and by deeper I mean wetter.`);
    playSound('descend', this.soundEnabled);

    if (answer.rarity > this.rarestRarity) {
      this.rarestRarity = answer.rarity;
      this.rarestAnswer = answer;
    }

    this.descend(rarityInfo.depth, rarityInfo.label);
  }

  descend(depthChange, rarityLabel) {
    this.depth += depthChange;
    if (this.depth > this.maxDepth) this.maxDepth = this.depth;
    if (rarityLabel === 'timeout') {
      this.score += 0;
    } else {
      this.score += depthChange * 10;
    }
    this.updateDisplay();
    this.updateDepthTransition();
  }

  afterAnswer() {
    this.promptIndex++;

    if (this.promptIndex >= this.totalPrompts) {
      setTimeout(() => this.endDive(), 500);
    } else {
      setTimeout(() => this.loadPrompt(), 800);
    }
  }

  endDive() {
    playSound('surface', this.soundEnabled);
    this.updateFriend('triumphant', `Dive complete! You reached ${this.maxDepth}m. Missionary position achieved!`);
    this.el.diveSummary.style.display = 'block';
    this.el.finalDepth.textContent = `${this.maxDepth}m`;
    this.el.finalScore.textContent = this.score;
    this.el.finalMaxDepth.textContent = `${this.maxDepth}m`;
    this.el.finalRarity.textContent = this.rarestAnswer ? this.rarestAnswer.text : '—';
    this.el.finalZone.textContent = this.getZoneForDepth(this.maxDepth).name;

    this.updateDepth(this.maxDepth);
  }

  updateDisplay() {
    this.el.depthValue.textContent = `${this.depth}m`;
    this.el.promptsValue.textContent = `${this.promptIndex + 1}/${this.totalPrompts}`;
    this.el.scoreValue.textContent = this.score;

    const rarityInfo = this.rarestRarity > 0 ? rarityTiers[this.rarestRarity] : { label: '—', color: 'var(--text-secondary)' };
    this.el.rarityValue.textContent = rarityInfo.label;
    this.el.rarityValue.style.color = rarityInfo.color;

    const zone = this.getZoneForDepth(this.depth);
    this.el.depthLabel.textContent = zone.label;
    this.el.zoneName.textContent = zone.name;
    this.el.zoneDepth.textContent = zone.description;

    this.el.oceanBg.className = 'ocean-bg ' + zone.bgClass;
    this.el.depthBarFill.className = 'depth-bar-fill ' + zone.barClass;
  }

  updateDepth(depth) {
    const zone = this.getZoneForDepth(depth);
    this.el.oceanBg.className = 'ocean-bg ' + zone.bgClass;
    this.el.depthBarFill.className = 'depth-bar-fill ' + zone.barClass;

    const percent = Math.min(100, (depth / 332) * 100);
    this.el.depthBarFill.style.height = `${percent}%`;
    this.el.depthBarFill.style.top = `${100 - percent}%`;
  }

  updateDepthTransition() {
    this.updateDepth(this.depth);
  }

  getZoneForDepth(depth) {
    const zones = oceanZones;
    for (let i = zones.length - 1; i >= 0; i--) {
      if (depth >= zones[i].minDepth) {
        return zones[i];
      }
    }
    return zones[0];
  }

  updateTimerDisplay() {
    this.el.timer.textContent = this.timeLeft;
    this.el.timer.className = 'timer' + (this.timeLeft <= 10 ? ' warning' : '');
  }

  updateFriend(mood, message) {
    this.friendMood = mood;
    const moodEmojis = {
      happy: '🐟',
      horny: '🐳',
      embarrassed: '😳',
      triumphant: '🐋',
    };
    this.el.friendImg.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${moodEmojis[mood] || '🐟'}</text></svg>`;
    this.el.friendMessage.textContent = message;
  }

  vibrate() {
    if (this.vibrationEnabled && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  shuffleArray(arr) {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  shuffleIndices(n, seed) {
    const indices = Array.from({ length: n }, (_, i) => i);
    const seededRandom = (seed) => {
      const str = seed.toString();
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };
    let rng = seededRandom(seed);
    const random = () => {
      rng = (rng * 9301 + 49297) % 233280;
      return rng / 233280;
    };
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }

  getDailyIndex() {
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  }
}

// Start game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.seamenGame = new SeamenGame();
});