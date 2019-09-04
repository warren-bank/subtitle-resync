const show_message = (msg, prefix, nowrap) => {
  if (typeof prefix !== 'string')
    prefix = ''

  if (prefix)
    msg = prefix + msg

  const el = document.getElementById('error_message')
  el.innerHTML = msg
    ? (nowrap ? msg : `<h2>${msg}</h2>`)
    : ''
}

const show_error = (msg) => {
  show_message(msg, 'Error: ', false)
}

const show_result = (ms) => {
  let msg

  if (ms === 0) {
    msg = '<span style="color:green;">&#x2714; SRT is in sync with video</span>'
  }
  else {
    msg = (ms < 0)
      ? 'Remove delay'
      : 'Add delay'

    msg += ` of ${Math.abs(ms)} Millisecond(s)`
  }

  show_message(msg, '', false)
}

const get_position_ms = (form, name) => {
  let ts = form[name].value
  let ms = null

  ts.replace(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/g, function(){
    ms = ts2ms( [].slice.call(arguments, 1 , 5))
  })

  return ms
}

const handleFormSubmit = (event) => {
  event.preventDefault()
  event.stopPropagation()

  const form = document.getElementById('form')

  const ms_vid = get_position_ms(form, 'ts_vid')
  const ms_srt = get_position_ms(form, 'ts_srt')

  let msg = []
  if (ms_vid === null) {
    msg.push('<p>Video timestamp is not formatted correctly <br /><span class="small pre">(HH:mm:ss,SSS)</span></p>')
  }
  if (ms_srt === null) {
    msg.push('<p>SRT timestamp is not formatted correctly <br /><span class="small pre">(HH:mm:ss,SSS)</span></p>')
  }
  if (msg.length) {
    msg.push('<p class="inlineblock left small pre">H: hours<br />m: minutes<br />s: seconds<br />S: milliseconds<br /><br />only substitute integers: 0-9</p>')
    msg = msg.join('')

    show_error(msg)
    return
  }

  const result = ms_vid - ms_srt

  show_result(result)
}

const init = () => {
  let el

  // remove the "noscript" css class
  document.querySelectorAll('.noscript').forEach(el => {
    el.classList.remove('noscript')
  })

  // add event handler to form submission
  el = document.getElementById('form')
  el.addEventListener('submit', handleFormSubmit, false)  
}

init()
