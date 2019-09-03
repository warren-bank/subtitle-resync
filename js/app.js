var selectedFile = null

const show_error = (msg) => {
  const el = document.getElementById('error_message')
  el.innerHTML = msg
    ? `<h2>Error: ${msg}</h2>`
    : ''
}

const handleFileSelect = (event) => {
  selectedFile = (event.target && event.target.files && event.target.files.length && event.target.files[0])
    ? event.target.files[0]
    : null

  show_error('')
}

const handleFormSubmit = (event) => {
  event.preventDefault()
  event.stopPropagation()

  if (!selectedFile) {
    show_error('SRT file must be selected.')
    return
  }
  else {
    readSelectedFile()
  }
}

const readSelectedFile = () => {
  const reader = new FileReader()

  reader.onloadend = (event) => {
    if (event.target.readyState === FileReader.DONE) {
      const old_srt = event.target.result
      performResync(old_srt)
    }
  }

  reader.readAsText(selectedFile)
}

const performResync = (old_srt) => {
  const form = document.getElementById('form')

  const ts = [
    get_duration(form, 'hour'),
    get_duration(form, 'min'),
    get_duration(form, 'sec'),
    get_duration(form, 'ms')
  ]

  const ms = ts2ms(ts)

  const delay = ms * parseInt(
    get_duration(form, 'sign', true),
    10
  )

  const new_srt = resync(delay, old_srt)

  download_file(selectedFile.name, new_srt)
}

const get_duration = (form, unit, unsanitized) => {
  let val

  val = form[unit].value

  if (unsanitized)
    return val

  val = val.replace(/[^0-9\.]/g, '')
  val = val.replace(/[\.]{2,}/g, '.')

  if (val === '.')
    val = ''

  if (val === '')
    val = '0'

  return val
}

const download_file = (name, data) => {
  //console.log(name, "\n\n", data)

  const data_uri = 'data:text/plain;charset=utf-8;base64,' + base64Encode(data)

  const anchor = document.createElement('a')
  anchor.setAttribute('download', name)
  anchor.setAttribute('href', data_uri)
  anchor.click()
}

const base64Encode = (data) => {
  const normalized = encodeURIComponent(data).replace(
    /%([0-9A-F]{2})/g,
    ($0, hex) => String.fromCharCode("0x" + hex)
  )

  const encoded = btoa(normalized)

  return encoded
}

const init = () => {
  let el

  // verify the necessary HTML5 APIs are supported
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    show_error('HTML5 File APIs are not fully supported in this browser.')
    return
  }

  // remove the "noscript" css class
  document.querySelectorAll('.noscript').forEach(el => {
    el.classList.remove('noscript')
  })

  // add event handler to input file selection
  el = document.getElementById('file')
  el.addEventListener('change', handleFileSelect, false)

  // add event handler to form submission
  el = document.getElementById('form')
  el.addEventListener('submit', handleFormSubmit, false)  
}

init()
