const errors = {
  '403': 'Access denied',
  '404': 'Not Found',
  '405': 'TokenExpired',
  '2001': '无权限访问',
  '2002': '账号或者密码错误'
}

function Exception (code, extra, err) {
  this.error_code = code
  this.error_msg = errors[ code.toString() ] || err || extra || '未知错误'
  this.external = true
  if (extra) this.error_extra = extra
  this.stack = (new Error()).stack
}

module.exports = Exception
