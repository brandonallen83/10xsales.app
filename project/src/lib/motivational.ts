interface MotivationalMessage {
  message: string;
  type: 'behind' | 'onTrack' | 'exceeding';
}

const behindMessages: string[] = [
  "Keep pushing! Every sale brings you closer to your goal.",
  "Small steps lead to big achievements. Stay focused!",
  "Your breakthrough is just around the corner!",
  "Success is built one customer at a time. Keep going!",
  "You've got this! Time to kick it into high gear.",
  "Every champion faced challenges. This is your moment to shine!",
  "Your potential is unlimited. Let's make it happen!",
  "Today's efforts are tomorrow's victories.",
  "Believe in yourself. Your next big sale is coming!",
  "Challenges are opportunities in disguise. Seize them!"
];

const onTrackMessages: string[] = [
  "You're in the zone! Keep that momentum going!",
  "Perfect pace! You're right where you need to be.",
  "Consistency wins the race. You're proving it!",
  "Your dedication is paying off. Stay the course!",
  "You've found your rhythm. Keep it up!",
  "This is what success looks like. Well done!",
  "You're making it happen! Stay focused!",
  "Great work maintaining your pace!",
  "You're showing what you're capable of!",
  "Keep this energy going! You're doing great!"
];

const exceedingMessages: string[] = [
  "🌟 Outstanding performance! You're crushing it!",
  "🏆 You're not just meeting goals, you're setting new standards!",
  "💫 Phenomenal work! You're in a league of your own!",
  "🚀 Unstoppable! Your success is inspiring others!",
  "⭐ You're redefining what's possible! Amazing work!",
  "🎯 Excellence personified! Keep soaring higher!",
  "💪 You're proving that limits are just suggestions!",
  "🌠 Extraordinary achievement! You're on fire!",
  "🏅 Top-tier performance! You're making history!",
  "✨ Legendary status achieved! Keep breaking records!"
];

export function getMotivationalMessage(progressPercentage: number): string {
  const getRandomMessage = (messages: string[]) => 
    messages[Math.floor(Math.random() * messages.length)];

  if (progressPercentage >= 400) {
    return `${getRandomMessage(exceedingMessages)} (400%+ of goal!)`;
  } else if (progressPercentage >= 300) {
    return `${getRandomMessage(exceedingMessages)} (300%+ of goal!)`;
  } else if (progressPercentage >= 200) {
    return `${getRandomMessage(exceedingMessages)} (200%+ of goal!)`;
  } else if (progressPercentage >= 150) {
    return `${getRandomMessage(exceedingMessages)} (150%+ of goal!)`;
  } else if (progressPercentage >= 100) {
    return `${getRandomMessage(exceedingMessages)} (Goal achieved!)`;
  } else if (progressPercentage >= 90) {
    return `${getRandomMessage(onTrackMessages)} (90% there!)`;
  } else if (progressPercentage >= 80) {
    return `${getRandomMessage(onTrackMessages)} (80% complete!)`;
  } else if (progressPercentage >= 70) {
    return `${getRandomMessage(onTrackMessages)} (70% there!)`;
  } else if (progressPercentage >= 60) {
    return `${getRandomMessage(onTrackMessages)} (60% complete!)`;
  } else if (progressPercentage >= 50) {
    return `${getRandomMessage(onTrackMessages)} (Halfway there!)`;
  } else if (progressPercentage >= 40) {
    return `${getRandomMessage(behindMessages)} (40% complete)`;
  } else if (progressPercentage >= 30) {
    return `${getRandomMessage(behindMessages)} (30% there)`;
  } else if (progressPercentage >= 20) {
    return `${getRandomMessage(behindMessages)} (20% complete)`;
  } else if (progressPercentage >= 10) {
    return `${getRandomMessage(behindMessages)} (10% started)`;
  } else {
    return `${getRandomMessage(behindMessages)} (Let's get started!)`;
  }
}