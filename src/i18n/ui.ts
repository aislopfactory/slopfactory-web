export const languages = ['en', 'ko'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

export const langLabel: Record<Lang, string> = { en: 'English', ko: '한국어' };
export const langShort: Record<Lang, string> = { en: 'EN', ko: 'KO' };

type Dict = {
  siteTitle: string;
  siteDescription: string;
  nav: { about: string; work: string; blog: string };
  skip: string;
  a11y: { home: string; primaryNav: string };
  hero: { kicker: string; line1: string; line2: string; lede: string; ctaPrimary: string; ctaSecondary: string; stampTop: string; stampMid: string; stampBot: string };
  ticker: string;
  promise: { kicker: string; title: string; items: { n: string; title: string; body: string }[] };
  work: { kicker: string; title: string; lede: string; trailer: string; shot: string; soon: string };
  about: { kicker: string; title: string; body: string[]; facts: { k: string; v: string }[] };
  blog: { kicker: string; title: string; lede: string; latest: string; all: string; empty: string; readMore: string; back: string; minRead: string; onlyHere: string };
  footer: { tagline: string; rights: string; madeIn: string };
};

export const ui: Record<Lang, Dict> = {
  en: {
    siteTitle: 'Slop Factory',
    siteDescription: 'A Korea-based studio making web games, and refusing to ship slop.',
    nav: { about: 'Studio', work: 'Games', blog: 'Blog' },
    skip: 'Skip to content',
    a11y: { home: 'home', primaryNav: 'Primary' },
    hero: {
      kicker: 'Web games · Made in Korea',
      line1: 'We make games.',
      line2: 'Not slop.',
      lede: 'Slop Factory is a small studio building web games that are played, tested and argued over before they ship. We picked the name as a reminder that every game has to earn the right not to be called slop.',
      ctaPrimary: 'Read the blog',
      ctaSecondary: 'About the studio',
      stampTop: 'Quality control',
      stampMid: 'Not slop',
      stampBot: 'Inspected',
    },
    ticker: 'Not slop',
    promise: {
      kicker: '01 — The promise',
      title: 'Three rules on the factory floor.',
      items: [
        { n: '01', title: 'Played before shipped', body: 'If nobody on the team wants to play it twice, it does not leave the building. We play every build ourselves, and whatever bores us gets fixed or cut.' },
        { n: '02', title: 'Small on purpose', body: 'A few games, finished properly, beat a hundred half-baked ones. We would rather cut a feature than pad it.' },
        { n: '03', title: 'A human signs off', body: 'Tools can help us make things. A person decides whether a thing is good enough to put our name on.' },
      ],
    },
    work: {
      kicker: '02 — On the line',
      title: 'Games, coming off the line.',
      lede: 'Nothing is ready to show yet, and we would rather leave the shelf empty than fill it with filler. Screenshots, clips and trailers will live here.',
      trailer: 'Trailer',
      shot: 'Screenshot',
      soon: 'Not ready. Not slop.',
    },
    about: {
      kicker: '03 — The studio',
      title: 'A small studio that objects to slop.',
      body: [
        'Slop Factory is a Korea-based game studio. We build for the browser because it is the most open platform there is: no store, no install, just a link.',
        'We chose a name that makes people raise an eyebrow, then set ourselves the harder job of never earning it. Every mechanic, sound and line of text in our games is there because someone decided it should be, and the blog shows how it all gets made, including the parts that go badly.',
      ],
      facts: [
        { k: 'Based in', v: 'Korea' },
        { k: 'Platform', v: 'Web (desktop + mobile)' },
        { k: 'Languages', v: 'English, 한국어' },
        { k: 'Status', v: 'In the workshop' },
      ],
    },
    blog: {
      kicker: 'Field notes',
      title: 'Blog',
      lede: 'Notes from the factory floor: what we are making, what we threw away, and why.',
      latest: 'Latest from the blog',
      all: 'All posts',
      empty: 'No posts yet. The first one is on its way.',
      readMore: 'Read post',
      back: 'All posts',
      minRead: 'min read',
      onlyHere: 'This post is only available in English.',
    },
    footer: {
      tagline: 'Web games. Not slop.',
      rights: 'Slop Factory',
      madeIn: 'Made in Korea. A human signs off.',
    },
  },
  ko: {
    siteTitle: '슬롭 팩토리',
    siteDescription: '대충 만든 게임은 내보내지 않는, 한국의 웹 게임 스튜디오.',
    nav: { about: '스튜디오', work: '게임', blog: '블로그' },
    skip: '본문으로 건너뛰기',
    a11y: { home: '홈', primaryNav: '주 메뉴' },
    hero: {
      kicker: '웹 게임 · 한국에서 만듭니다',
      line1: '게임을 만듭니다.',
      line2: '대충은 아닙니다.',
      lede: '슬롭 팩토리는 직접 해 보고, 테스트하고, 끝까지 따져 본 뒤에야 내놓는 웹 게임을 만드는 작은 스튜디오입니다. 이 이름은 모든 게임이 슬롭이라 불리지 않을 자격을 갖춰야 한다는 다짐입니다.',
      ctaPrimary: '블로그 읽기',
      ctaSecondary: '스튜디오 소개',
      stampTop: '품질 검수',
      stampMid: '슬롭 아님',
      stampBot: '검수 완료',
    },
    ticker: '슬롭 아님',
    promise: {
      kicker: '01 — 약속',
      title: '공장 바닥에 붙인 세 가지 원칙.',
      items: [
        { n: '01', title: '해 보고 내놓는다', body: '팀원 누구도 두 번 하고 싶지 않은 게임은 공장 문을 나서지 못합니다. 모든 빌드를 직접 플레이해 보고, 지루한 부분은 고치거나 덜어 냅니다.' },
        { n: '02', title: '일부러 작게 만든다', body: '제대로 끝낸 게임 몇 개가 어설픈 게임 백 개보다 낫습니다. 기능을 억지로 부풀리느니 덜어 냅니다.' },
        { n: '03', title: '마지막은 사람이 본다', body: '도구는 만드는 일을 도울 수 있습니다. 하지만 저희 이름을 걸어도 될 만큼 좋은지는 사람이 판단합니다.' },
      ],
    },
    work: {
      kicker: '02 — 생산 라인',
      title: '라인에서 나올 게임들.',
      lede: '아직 보여 드릴 만한 게임이 없습니다. 선반을 대충 채우느니 비워 두겠습니다. 스크린샷, 영상, 트레일러는 앞으로 이곳에 올라옵니다.',
      trailer: '트레일러',
      shot: '스크린샷',
      soon: '아직 준비 중. 대충은 아님.',
    },
    about: {
      kicker: '03 — 스튜디오',
      title: '슬롭에 반대하는 작은 스튜디오.',
      body: [
        '슬롭 팩토리는 한국의 게임 스튜디오입니다. 저희는 브라우저를 위해 만듭니다. 스토어도 설치도 없이 링크 하나면 되는, 가장 열린 플랫폼이니까요.',
        '고개를 갸웃거리게 할 만한 이름을 붙이고, 그 이름에 걸맞은 결과물은 절대 내지 않겠다는 더 어려운 숙제를 스스로 떠안았습니다. 게임 속 모든 메커닉과 소리, 문장은 누군가 이유를 갖고 고른 것이고, 만드는 과정은 잘 풀리지 않은 부분까지 블로그에서 보여 드립니다.',
      ],
      facts: [
        { k: '소재지', v: '한국' },
        { k: '플랫폼', v: '웹 (데스크톱 + 모바일)' },
        { k: '언어', v: 'English, 한국어' },
        { k: '상태', v: '작업실에서 제작 중' },
      ],
    },
    blog: {
      kicker: '현장 기록',
      title: '블로그',
      lede: '공장 바닥에서 보내는 기록: 무엇을 만들고, 무엇을 버렸고, 왜 그랬는지.',
      latest: '블로그 최신 글',
      all: '전체 글',
      empty: '아직 글이 없습니다. 첫 글을 준비하고 있습니다.',
      readMore: '글 읽기',
      back: '전체 글',
      minRead: '분 읽기',
      onlyHere: '이 글은 한국어로만 제공됩니다.',
    },
    footer: {
      tagline: '웹 게임. 대충은 아닙니다.',
      rights: '슬롭 팩토리',
      madeIn: '한국에서 만들고, 마지막은 사람이 봅니다.',
    },
  },
};

export function otherLang(l: Lang): Lang {
  return l === 'en' ? 'ko' : 'en';
}

export function formatDate(d: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).format(d);
}
