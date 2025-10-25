const url = new URL(window.location.href)
let reload = false

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
if (url.searchParams.get('timezone') !== timezone) {
  url.searchParams.set('timezone', timezone)
  reload = true
}

const locale = Intl.DateTimeFormat().resolvedOptions().locale
if (url.searchParams.get('locale') !== locale) {
  url.searchParams.set('locale', locale)
  reload = true
}

if (reload) {
  window.location.assign(url)
}
