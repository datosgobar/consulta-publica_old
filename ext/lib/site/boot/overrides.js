import * as Header from 'lib/site/header/component'
import HeaderExt from 'ext/lib/site/header/component'

import * as HomeForum from 'lib/site/home-forum/component'
import HomeForumExt from 'ext/lib/site/home-forum/component'

import * as HomeMultiForum from 'lib/site/home-multiforum/component'
import HomeMultiForumExt from 'ext/lib/site/home-multiforum/component'

import * as Help from 'lib/site/help/component'
import HelpExt from 'ext/lib/site/help/component'

import * as SidebarListItem from 'lib/site/topic-layout/sidebar/list/list-item/component'
import SidebarListItemExt from 'ext/lib/site/topic-layout/sidebar/list/list-item/component'

Header.default = HeaderExt
HomeForum.default = HomeForumExt
HomeMultiForum.default = HomeMultiForumExt
Help.default = HelpExt
SidebarListItem.default = SidebarListItemExt
