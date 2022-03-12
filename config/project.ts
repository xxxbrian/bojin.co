import { CheckCircle, DollarSign, Icon, Link2, Tv } from 'react-feather'

export interface ProjectProps {
  name: string
  link: string
  slug: string
  icon: Icon
}

export const projectLinks: ProjectProps[] = [
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
    icon: DollarSign,
  },
]
