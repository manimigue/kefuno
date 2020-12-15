const linkMaker = (url, text) => ({url, text})

const links = [
  linkMaker('/news', 'News'),
  linkMaker('/about', 'About'),
  linkMaker('/work', 'Work'),
  linkMaker('/member', 'Member'),
  linkMaker('/ticket', 'Ticket'),
  linkMaker('/contact', 'Contact'),
  linkMaker('/', 'Home')
]

export default links