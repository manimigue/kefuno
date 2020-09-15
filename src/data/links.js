const linkMaker = (url, text) => ({url, text})

const links = [
  linkMaker('/', 'Home'),
  linkMaker('/home2', 'Home2'),
  linkMaker('/news', 'News'),
  linkMaker('about', 'About'),
  linkMaker('/work', 'Work'),
  linkMaker('/member', 'Member'),
  linkMaker('/ticket', 'Ticket'),
  linkMaker('/contact', 'Contact')
]

export default links