import React, {Component} from 'react'
import { Link } from 'react-router'
import t from 't-component'

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.articles = [
      {
        label: '¿Cómo funciona?',
        path: '/ayuda/como-funciona'
      },
      {
        label: 'Acerca de este sitio',
        path: '/ayuda/acerca'
      },
      {
        label: t('help.tos.title'),
        path: '/ayuda/terminos-y-condiciones'
      },
      {
        label: t('help.pp.title'),
        path: '/ayuda/privacidad'
      },
      {
        label: t('help.markdown.title'),
        path: '/ayuda/markdown'
      }
    ]
  }

  render () {
    return (
      <div id='help-sidebar-container'>
        <div className='help-sidebar'>
          {
            this.articles.map((article, key) => {
              return (
                <Link key={key} to={article.path}>{article.label}</Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}
