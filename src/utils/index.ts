const el = document.getElementById('sketch')!

export const getEl = () => el

export const clearEl = () => {
  el.innerHTML = ''
}
