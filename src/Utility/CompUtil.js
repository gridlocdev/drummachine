export default {
    ripple: function($el) {
      let ev = new Event("mousedown")
      let offset = $el.getBoundingClientRect()
      ev.clientX = offset.left + offset.width/2
      ev.clientY = offset.top + offset.height/2
      $el.dispatchEvent(ev)
  
      setTimeout(function() {
        $el.dispatchEvent(new Event("mouseup"))
      }, 10)
    }
  }