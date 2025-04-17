const el = document.getElementById('sketch')!

export const getEl = (cleanFirst = true) => {
  if (cleanFirst) clearEl()
  return el
}

export const clearEl = () => {
  el.replaceChildren()
  el.style = ''
}
