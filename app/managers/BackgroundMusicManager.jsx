import { Audio } from 'expo-av';
import { sounds } from '../../constants/sounds';

class BackgroundMusicManager {
  constructor() {
    this.sound = new Audio.Sound();
    this.isLoaded = false;
    this.isPlaying = false;
  }

  async loadMusic() {
    try {
      if (!this.isLoaded) {
        await this.sound.loadAsync(sounds.gamebgm);
        await this.sound.setIsLoopingAsync(true);
        this.isLoaded = true;
        console.log('Music loaded');
      }
    } catch (error) {
      console.error('Error loading background music:', error);
    }
  }

  async play() {
    try {
      if (this.isLoaded && !this.isPlaying) {
        await this.sound.playAsync();
        this.isPlaying = true;
        console.log('Background music started');
      }
    } catch (error) {
      console.error('Error playing background music:', error);
    }
  }

  async pause() {
    try {
      if (this.isPlaying) {
        await this.sound.pauseAsync();
        this.isPlaying = false;
        console.log('Background music paused');
      }
    } catch (error) {
      console.error('Error pausing background music:', error);
    }
  }

  async stop() {
    try {
      if (this.isPlaying) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.isLoaded = false;
        this.isPlaying = false;
        console.log('Background music stopped and unloaded');
      }
    } catch (error) {
      console.error('Error stopping background music:', error);
    }
  }
}

const backgroundMusicManager = new BackgroundMusicManager();
export default backgroundMusicManager;
