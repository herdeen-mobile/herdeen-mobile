/**
 * Islamic & Daily Time Calculation Utilities
 */

/**
 * Converts "HH:MM AM/PM" or 24-hour "HH:MM" string to minutes from midnight (0 - 1439)
 */
export function timeToMinutes(timeStr?: string): number {
  if (!timeStr) return 0;
  const cleaned = timeStr.trim();
  const parts = cleaned.split(' ');
  const [hoursStr, minutesStr] = (parts[0] || '0:0').split(':');
  let hours = parseInt(hoursStr, 10) || 0;
  const minutes = parseInt(minutesStr, 10) || 0;

  if (parts.length > 1) {
    const modifier = parts[1].toUpperCase();
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
  }

  return hours * 60 + minutes;
}

/**
 * Formats a duration in minutes into a friendly string like "12 Min" or "1h 45m"
 */
export function formatRemainingTime(diffMins: number): string {
  if (diffMins <= 0) return 'Due now';
  if (diffMins < 60) return `${diffMins} Min`;
  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

/**
 * Converts a 24h or 12h time string to a standard 12-hour formatted time with AM/PM
 */
export function formatPrayerTime12Hour(timeStr?: string): string {
  if (!timeStr) return '--:--';
  const parts = timeStr.trim().split(' ');
  if (parts.length > 1) {
    return timeStr.trim();
  }
  const [hStr, mStr] = parts[0].split(':');
  let h = parseInt(hStr, 10) || 0;
  const m = mStr ? mStr.padStart(2, '0') : '00';
  const modifier = h >= 12 ? 'PM' : 'AM';
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${m} ${modifier}`;
}

/**
 * Returns formatted Hijri date string (e.g. "17 Ramadan 1446 AH")
 */
export function getHijriDateString(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return `${formatter.format(date)} AH`;
  } catch {
    return '17 Ramadan 1446 AH';
  }
}

export interface NextPrayerResult {
  currentPrayerName: string;
  nextPrayerName: string;
  nextPrayerTime: string;
  minutesRemaining: number;
  countdownText: string;
}

/**
 * Calculates current and next prayer based on today's prayer schedule
 */
export function getPrayerTimeline(
  prayers: { name: string; time: string; key?: string }[],
  currentDate: Date = new Date()
): NextPrayerResult {
  if (!prayers || prayers.length === 0) {
    return {
      currentPrayerName: 'Fajr',
      nextPrayerName: 'Dhuhr',
      nextPrayerTime: '--:--',
      minutesRemaining: 0,
      countdownText: 'Prayer times pending',
    };
  }

  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  let currentIndex = prayers.length - 1;
  for (let i = 0; i < prayers.length; i++) {
    const prayerMinutes = timeToMinutes(prayers[i].time);
    if (currentMinutes < prayerMinutes) {
      currentIndex = i === 0 ? prayers.length - 1 : i - 1;
      break;
    }
  }

  const nextIndex = (currentIndex + 1) % prayers.length;
  const currentPrayer = prayers[currentIndex];
  const nextPrayer = prayers[nextIndex];

  const nextPrayerMinutes = timeToMinutes(nextPrayer.time);
  let diffMinutes = nextPrayerMinutes - currentMinutes;
  if (diffMinutes < 0) diffMinutes += 1440; // Next day cycle

  const countdownText = `${formatRemainingTime(diffMinutes)} to ${nextPrayer.name}`;

  return {
    currentPrayerName: currentPrayer.name,
    nextPrayerName: nextPrayer.name,
    nextPrayerTime: nextPrayer.time,
    minutesRemaining: diffMinutes,
    countdownText,
  };
}

