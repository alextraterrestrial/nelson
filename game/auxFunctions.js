function getHourMinSecArray(s) {
  let hour
  let min

  let h = Math.floor(s/3600)
  if (h<10) {
    hour = "0" + String(h)
  } else {
    hour = h
  }

  let m = Math.floor((s/3600-h) * 60)
  if (m<10) {
    min = "0" + String(m)
  } else {
    min = m
  }

  let sec = Math.floor(s-m*60-h*3600)
  if(sec<10) {
    sec = "0" + String(sec)
  } 

  return [hour, min, sec]
}




//testfunctions

function test(a) {
  if (typeof a == "object" || typeof a == "array") {
    console.table(a)
  } else {
    console.log("test -->")
    console.log(a)
  }
}
