import React, {Component} from 'react'
import { Link } from 'react-router'
import Geopattern from 'geopattern'

export default function ForumCard ({forum}) {
  return (
    <Link to={forum.url}>
      <div
        className='forum-card'
        style={{
          backgroundImage:
            forum.coverUrl ?
            `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${forum.coverUrl})` :
            Geopattern.generate(forum.id).toDataUrl()
        }}>
        <h1>{forum.title}</h1>
        <p className='desc'>
          {forum.summary}
        </p>
      </div>
    </Link>
  )
}
