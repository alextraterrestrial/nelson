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

function error(jqXHR, textStatus, errorThrown) {
  console.log(textStatus)
  console.log(errorThrown)
}

//testfunctions

// function that animate typing the "string" into the "element"
function typeAnimation(string, element) {
  let count = 1
  let type = setInterval(() => {
    element.html(string.substr(0,count))
    count++
    if(count>string.length) {
      clearInterval(type)
    }
  }, 60);
}

// changes string t lower case letters and removes specific characters
function prepareAnswer(string) {
  string = string.toLowerCase()
  
  let pattern = /[\s;:_,.-]/g
  
  string = string.replace(pattern, "")

  return string
}