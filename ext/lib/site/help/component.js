import React, {Component} from 'react'
import Sidebar from 'ext/lib/site/help/sidebar/component'
import MarkdownGuide from 'lib/site/help/md-guide/component'

export default class HelpLayout extends Component {
  constructor (props) {
    super(props)
    this.articles = {
      'como-funciona': {__html: require('./como.md')},
      'acerca': {__html: require('./acerca.md')},
      'terminos-y-condiciones': {__html: require('./tos.md')},
      'privacidad': {__html: require('./pp.md')}
    }
  }

  render () {
    return (
      <div id='help-container'>
        <Sidebar articles={this.props.route.articles} />
        {
          (
            !this.props.params.article ||
            this.props.params.article === 'markdown'
          ) &&
            <MarkdownGuide />
        }
        {
          this.props.params.article &&
          this.props.params.article !== 'markdown' &&
          this.articles[this.props.params.article] &&
          (
            <div className='article-container'>
              <div
                className='article-content'
                dangerouslySetInnerHTML={this.articles[this.props.params.article]} />
            </div>
          )
        }
      </div>
    )
  }
}
