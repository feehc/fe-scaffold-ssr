const BizLink = ({ to = '/', children }) => /^http/.test(to)
  ? <a target="_blank" href={to}>{children}</a>
  : <a href={to} onClick={() =>
    window.location.href = window.location.origin || `${window.location.protocol}//${window.location.host}`
  }>{children}</a>

export default BizLink;