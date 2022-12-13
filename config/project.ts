import { CheckCircle, Icon, Link2, Tv, Settings } from 'react-feather'
import { Discord, Bitcoin } from '@icons-pack/react-simple-icons'
export interface ProjectProps {
  name: string
  link: string
  slug: string
  icon: Icon
}

export const projectLinks: ProjectProps[] = [
  {
    name: 'Discord ChatGPT Bot',
    link: 'https://github.com/xxxbrian/Discord-ChatGPT-Bot',
    slug: 'xxxbrian/Discord-ChatGPT-Bot',
    icon: Discord,
  },
  {
    name: 'Surge Config',
    link: 'https://github.com/xxxbrian/Surgeconfig',
    slug: 'xxxbrian/Surgeconfig',
    icon: Settings,
  },
  {
    name: 'iptv',
    link: 'https://github.com/xxxbrian/iptv',
    slug: 'xxxbrian/iptv',
    icon: Tv,
  },
  {
    name: 'trojan.sh',
    link: 'https://github.com/xxxbrian/trojan.sh',
    slug: 'xxxbrian/trojan.sh',
    icon: Link2,
  },
  {
    name: 'UNSW-Moodle-Assistant',
    link: 'https://github.com/xxxbrian/UNSW-Moodle-Assistant',
    slug: 'xxxbrian/UNSW-Moodle-Assistant',
    icon: CheckCircle,
  },
  {
    name: 'AlgoTradingBot',
    link: 'https://github.com/xxxbrian/AlgoTradingBot',
    slug: 'xxxbrian/AlgoTradingBot',
    icon: Bitcoin,
  },
]
