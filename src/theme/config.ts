export const themeConfig = {
  siteName: "ChenSoul Blog",
  description: "Chensoul's personal blog",
  siteUrl: "http://localhost:4322",
  author: {
    name: "ChenSoul"
  },
  homeLinkLabel: "首页",
  navLinks: [
    { label: "归档", href: "/archive" },
    { label: "标签", href: "/tags" },
    { label: "链接", href: "/links" },
    { label: "关于", href: "/about" }
  ],
  socialHandles: {
    twitter: 'ichensoul',
    github: 'chensoul',
    telegram: 'ichensoul'
  },
  comments: {
    enabled: true,
    provider: 'artalk',
    utterances: {
      repo: '', // e.g. "owner/repo"
      issueTerm: 'pathname',
      label: 'comment'
    },
    artalk: { server: 'https://artalk.chensoul.cc/', site: 'Chensoul Blog' }
  }
};
