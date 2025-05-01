import { Component } from 'solid-js'

const pages = import.meta.glob('./pages/*.{jsx,tsx}', {
  eager: true,
  import: 'default',
})

const titles = import.meta.glob('./pages/*.{jsx,tsx}', {
  eager: true,
  import: 'title',
})

export const routes = Object.keys(pages).map((path) => {
  const routePath = path
    .replace('./pages/', '')
    .replace(/\.(jsx|tsx)$/, '')
    .replace(/\/index$/, '')
    .replace(/$$(\w+)$$/, ':$1')

  return {
    path: routePath === 'home' ? '/' : `/${routePath}`,
    component: pages[path] as Component,
    title: (titles[path] ||
      routePath.charAt(0).toUpperCase() + routePath.slice(1)) as string,
  }
})

export const routesList = () => routes
