import {Github, Props, Telegram, Twitter, Bilibili } from '@icons-pack/react-simple-icons'
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
    apiUrl: 'https://api.spencerwoo.com/substats/?source=github&queryKey=xxxbrian',
    color: '#24292f',
  },
  {
    name: 'Telegram',
    link: 'https://t.me/bojinli',
    icon: Telegram,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=telegram&queryKey=',
    color: '#2CA5E0',
    followerName: 'Add friend',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/bojinli',
    icon: Twitter,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=twitter&queryKey=bojinli',
    color: '#1da1f2',
  },
  {
    name: 'Bilibili',
    link: 'https://space.bilibili.com/50051237',
    icon: Bilibili,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=bilibili&queryKey=50051237',
    color: '#f25d8e',
    followerName: 'subscribers',
  },
]
