import {Github, Props, Telegram, Twitter, Bilibili, Sinaweibo} from '@icons-pack/react-simple-icons'
import { FC } from 'react'

export interface LinkProps {
  name: string
  link: string
  icon?: FC<Props>
  apiUrl: string
  color: string
  followerName?: string
}

export const socialLinks: LinkProps[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/xxxbrian',
    icon: Github,
    apiUrl: 'https://api.swo.moe/stats/github/xxxbrian',
    color: '#24292f',
  },
  {
    name: 'Instagram',
    link: 'https://instagram.com/li.pochin',
    icon: Telegram,
    apiUrl: 'https://api.swo.moe/stats/instagram/li.pochin',
    color: '#d7417b',
  },
  {
    name: 'Weibo',
    link: 'https://weibo.com/u/6128167899',
    icon: Sinaweibo,
    apiUrl: 'https://api.swo.moe/stats/weibo/6128167899',
    color: '#e71f19',
  },
  {
    name: 'Telegram',
    link: 'https://t.me/bojinli',
    icon: Telegram,
    apiUrl: 'https://api.swo.moe/stats/telegram/bojinli',
    color: '#2CA5E0',
    followerName: 'Add friend',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/bojinli',
    icon: Twitter,
    apiUrl: 'https://api.swo.moe/stats/twitter/bojinli',
    color: '#1da1f2',
  },
  {
    name: 'Bilibili',
    link: 'https://space.bilibili.com/50051237',
    icon: Bilibili,
    apiUrl: 'https://api.swo.moe/stats/bilibili/50051237',
    color: '#f25d8e',
    followerName: 'subscribers',
  },
]
