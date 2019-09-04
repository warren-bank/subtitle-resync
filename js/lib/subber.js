/*
 * -----------------------------------------------
 * forked from:
 * -----------------------------------------------
 * https://github.com/lionelB/subber
 * https://github.com/lionelB/subber/blob/e9904b05a4377cffb2b051eb12befcfc93a8cd92/LICENSE
 * https://github.com/lionelB/subber/blob/e9904b05a4377cffb2b051eb12befcfc93a8cd92/index.js
 *
 * copyright = Lionel Breduillieard
 * license   = MIT License
 * -----------------------------------------------
 */

/**
 * Transform a strt timestamp to ms
 * @param  {String}   ts a srt timestamp hh:mm:ss,ms
 * @return {int}      number of millisecond
 */
function ts2ms(ts){
  return ( parseInt(ts[0], 10) * 3600 +
    parseInt(ts[1], 10) * 60   +
    parseInt(ts[2], 10)) * 1000 +
    parseInt(ts[3], 10);
}

/**
 * Resync a str file with a delay
 * @param  {int}    delay a delay in ms
 * @param  {String} srt   a str file content
 * @return {String}       the resync srt content
 */
function resync (delay, srt) {
  return srt.replace(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/g, function(){
    var ms = ts2ms( [].slice.call(arguments, 1 , 5));
    ms += delay;
    return ms2ts(ms);
  });
}

/*
 * -----------------------------------------------
 * modified from original:
 * -----------------------------------------------
 */

/**
 * Format a number to a fixed string length by prepending "0" characters. Default length is 2. Milliseconds are padding to length of 3.
 * @param  {int}      val    a number to format
 * @param  {int}      index  the index of val in a parsed timestamp array
 * @return {String}   the formated number
 */
function format(val, index){
  const digits = (index === 3) ? 3 : 2
  const strval = String(val)
  const zcount = digits - strval.length
  const filler = (zcount > 0)
    ? ('0').repeat(zcount)
    : ''
  const newval = filler + strval

  return newval
}

/**
 * Transform a number of millisecond into a srt timestamp
 * @param  {int}      number of millisecond
 * @return {String}   a srt timestamp hh:mm:ss,ms
 */
function ms2ts(ms){
  const sign = (ms < 0) ? '-' : ''
  ms = Math.abs(ms)

  var scale = [3600*1000, 60*1000, 1000, 1 ];
  var ts = scale.map( function(val){
    var unit = parseInt(ms / val, 10);
    ms = ms % val;
    return unit;
  }).map(format);

  return sign + ts.slice(0,3).join(":") + "," + ts[ts.length-1];
}
