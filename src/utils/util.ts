import { DateTime } from 'luxon';

function isExpired(expiresAtMs: any) {
  if (!expiresAtMs) {
    return true;
  }
  const currentTime = DateTime.now().toMillis();
  return currentTime >= expiresAtMs;
}

function addSecondsToCurrentTime(numOfSeconds: any = 0) {
  return DateTime.now()
    .plus(numOfSeconds * 1000)
    .toMillis();
}

export { isExpired, addSecondsToCurrentTime };
