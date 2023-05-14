import labels from './labels.json'

export { default as LabelIcon } from './LabelIcon'
export type LabelType = typeof labels[number]
export { labels }