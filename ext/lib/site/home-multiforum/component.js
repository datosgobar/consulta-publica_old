import React, {Component} from 'react'
import {Link} from 'react-router'
import t from 't-component'
import debug from 'debug'
import userConnector from 'lib/site/connectors/user'
import forumStore from 'lib/stores/forum-store/forum-store'
import ForumCard from './forum-card/component'

const log = debug('democracyos:home-multiforum')

class HomeMultiForum extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forums: [],
      userHasForums: false,
      page: 0,
      loading: false,
      loadingUserForms: false,
      noMore: null
    }
  }

  componentWillMount () {
    // Get all forums
    this.setState({loading: true})

    forumStore.findAll({
      page: this.state.page
    }).then((forums) => {
      this.setState({
        loading: false,
        noMore: forums.length === 0,
        forums: this.state.forums.concat(forums),
        page: this.state.page + 1
      })
    }).catch((err) => {
      log('Forum home fetch error: ', err)
      this.setState({
        loading: false,
        noMore: true
      })
    })

    // Get user forums for permissions checking
    this.getUserForums()
  }

  componentWillUnmount () {
    forumStore.clear()
  }

  handleLoadMore = () => {
    if (this.state.loading) return
    this.setState({loading: true})
    forumStore.findAll({
      page: this.state.page
    }).then((forums) => {
      let nextState = {
        loading: false,
        page: this.state.page + 1
      }
      if (forums.length === 0) {
        nextState.noMore = true
      } else {
        nextState.forums = this.state.forums.concat(forums)
      }
      this.setState(nextState)
    }).catch((err) => {
      log('Found error %s', err)
      this.setState({loading: false, noMore: true})
    })
  }

  getUserForums = () => {
    this.setState({loadingUserForms: true})

    forumStore.findAll({
      'privileges.canChangeTopics': true
    }).then((forums) => {
      this.setState({
        userHasForums: forums && forums.length > 0,
        loadingUserForms: false
      })
    }).catch((err) => {
      if (err.status !== 400) throw err
      this.setState({
        userHasForums: false,
        loadingUserForms: false
      })
    })
  }

  render () {
    if (this.state.loadingUserForms) return null
    if (this.props.user.state.pending) return null

    const user = this.props.user.state.value || {}
    const canManage = user.privileges && user.privileges.canManage
    const canCreate = user.privileges && user.privileges.canCreate

    let info
    if (this.props.user.state.fulfilled) {
      if (this.state.userHasForums && canManage) {
        info = (
          <div className='forum-info'>
            <Link to='/settings/forums' className='admin'>
              Administrar mis consultas
              <span className='icon-arrow-right' />
            </Link>
          </div>
        )
      } else if (canCreate) {
        info = (
          <div className='forum-info cover'>
            <div className='content container'>
              <h1>¡El país lo hacés vos, es tu turno de hablar!</h1>
              <p>Entrá, comentá y debatí.</p>
              <Link to='/forums/new' className='btn btn-default'>
                {t('newsfeed.call-to-action.start-a-forum')}
                <span className='icon-arrow-right' />
              </Link>
            </div>
          </div>
        )
      }
    } else {
      info = (
        <div className='forum-info cover'>
          <div className='content container'>
            <h1>¡El país lo hacés vos, es tu turno de hablar!</h1>
            <p>Entrá, comentá y debatí.</p>
          </div>
        </div>
      )
    }
    return (
      <div id='home-multiforum' className='center-container'>
        {info}
        <div id='forum-list' className='container'>
          <div className='title'>
            <h2>Consultas</h2>
          </div>
          <section>
            {
              this.state.forums.map((forum, key) => {
                return <ForumCard forum={forum} key={key} />
              })
            }
            {
              this.state.forums.length === 0 &&
              !this.state.loading &&
              (
                <p className='msg-empty'>
                  {t('newsfeed.nothing-to-show')}
                </p>
              )
            }
          </section>

          {!this.state.noMore && (
            <div className='load-more'>
              {!this.state.loading && (
                <button
                  onClick={this.handleLoadMore}
                  className='btn btn-block'>
                  {t('newsfeed.button.load-more')}
                </button>
              )}
              {this.state.loading && (
                <button
                  className='loader-btn btn btn-block'>
                  <div className='loader' />
                  {t('newsfeed.button.load-more')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
