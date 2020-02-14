import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('date-format',function (value,formatStr="YYYY-MM-DD HH:mm:ss") {
  return format(value,formatStr)
})
