// PersistentBackgroundMusicManager.js

import { Audio } from 'expo-av';
import { sounds } from '../../constants/sounds';

class PersistentBackgroundMusicManager {
  constructor() {
    this.sound = null;
    this.isPlaying = false;
  }

  async loadMusic() {
    if (!this.sound) {
      this.sound = new Audio.Sound();
      try {
        await this.sound.loadAsync(sounds.gamebgm);
        await this.sound.setIsLoopingAsync(true);
      } catch (error) {
        console.error('Error loading background music:', error);
      }
    }
  }

  async play() {
    await this.loadMusic();  // Ensure the music is loaded
    if (!this.isPlaying) {
      try {
        await this.sound.playAsync();
        this.isPlaying = true;
        console.log('Background music started');
      } catch (error) {
        console.error('Error playing background music:', error);
      }
    }
  }

  async pause() {
    if (this.sound && this.isPlaying) {
      try {
        await this.sound.pauseAsync();
        this.isPlaying = false;
        console.log('Background music paused');
      } catch (error) {
        console.error('Error pausing background music:', error);
      }
    }
  }

  async stop() {
    if (this.sound && this.isPlaying) {
      try {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
        this.isPlaying = false;
        console.log('Background music stopped and unloaded');
      } catch (error) {
        console.error('Error stopping background music:', error);
      }
    }
  }
}

const persistentBackgroundMusicManager = new PersistentBackgroundMusicManager();
export default persistentBackgroundMusicManager;
