import { Session } from 'types'
import moment from 'moment'
import css from './SessionSnack.module.scss'
import { CalendarIcon, VideoCameraIcon } from '@heroicons/react/outline'
import SpeakerIconList from 'components/Speaker/IconList'
import Link from 'next/link'

export type SessionStatus = 'active' | 'past' | 'normal'

interface Props {
  session: Session
  status?: SessionStatus
  learnMore?: boolean
}

const formatDateTime = (start: number, end: number) => {
  return `${moment(start).format('MMMM D / H:mm')}-${moment(end).format('H:mm')}`
}

export default function SessionSnack({ session, learnMore, status = 'normal' }: Props) {
  return (
    <div className={`${css.container} ${css[status]}`}>
      <div className={css.title}>{session.name}</div>
      <div className={css.body}>
        <div>
          <div className={css.iconText}>
            <CalendarIcon />
            <span>{formatDateTime(session.start, session.end)}</span>
          </div>
          <div className={css.iconText}>
            <VideoCameraIcon />
            <span>{session.stage}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <SpeakerIconList speakers={session.speakers} />
          {learnMore && (
            <Link href={'/session/' + session.id}>
              <div className={css.learnMore}> Learn more {'>>'}</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
