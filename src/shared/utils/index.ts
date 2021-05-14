import { Language } from './../../core/constant/enum';
export const formatHash = (hash: string) => {
  if (hash.length <= 10) {
    return hash;
  }
  return `${hash.slice(0, 5)}....${hash.slice(hash.length - 5)}`
};

export const formatLastedTime = (time: string, lang: Language) => {
  const last = new Date(time).getTime();
  const now = Date.now();
  const seconds = Math.ceil((now - last) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (seconds === 1 || seconds === 0) {
    return lang === Language.en ? `1 second ago` : `1 秒前`;
  } else if (seconds < 60) {
    return lang === Language.en ? `${seconds} seconds ago` : `${seconds} 秒前`;
  } else if (minutes === 1) {
    return lang === Language.en ? `1 minute ago` : `1 分钟前`;
  } else if (minutes < 60) {
    return lang === Language.en ? `${minutes} minutes ago` : `${minutes} 分钟前`;
  } else if (hours === 1) {
    return lang === Language.en ? `1 hour ago` : `1 小时前`;
  } else if (hours < 24) {
    return lang === Language.en ? `${hours} hours ago` : `${hours} 小时前`;
  } else if (days === 1) {
    return lang === Language.en ? `1 day ago` : `1 天前`;
  }
  return lang === Language.en ? `${days} days ago` : `${days} 天前`;
};

