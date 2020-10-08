export interface User {
  email: string
  password: string
}

export interface Category {
  name: string
  imagePath?: string
  user?: string
  _id?: string
}

export interface Message {
  message: string
}

export interface Position {
  name: string
  cost: number
  user?: string
  category: string
  _id?: string
  quantity?: number
}

export interface Order {
  date?: Date
  order?: number
  list: any[]
  user?: string
  _id?: string
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

export interface Overview {
  revenue: OverviewItem
  orders: OverviewItem
}

export interface OverviewItem {
  percent: number
  compare: number
  yesterday: number
  isHigher: boolean
}

export interface Analytics {
  average: number
  chart: AnalyticsItem[]
}

export interface AnalyticsItem {
  revenue: number
  orders: number
  label: string
}
