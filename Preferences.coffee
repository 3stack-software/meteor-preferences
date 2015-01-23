stringify = (value) ->
  if value is undefined
    return 'undefined'

  return EJSON.stringify value

parse = (serialized) ->
  if serialized is undefined or serialized is "undefined"
    return undefined

  return EJSON.parse serialized

Preferences =
  setItem: (key, value) ->
    unless window.localStorage?
      Log.error 'Error calling AppStorage.setItem: window.localStorage not defined.'
      return

    window.localStorage.setItem key, stringify(value)

    return

  getItem: (key, defaultOrFn) ->
    unless _.isFunction(defaultOrFn)
      x = defaultOrFn
      defaultOrFn = -> x

    unless window.localStorage?
      Log.error 'Error calling AppStorage.setItem: window.localStorage not defined.'
      return defaultOrFn()

    try
      value = window.localStorage.getItem(key)
      returnValue = parse(value)
    catch e
      Log.error "Error getting object from storage:", e
      returnValue = undefined

    if returnValue is undefined
      returnValue = defaultOrFn()
      if returnValue isnt undefined
        @setItem(key, returnValue)
    return returnValue
