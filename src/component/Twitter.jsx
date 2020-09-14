import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed'

import '../sass/sns/twitter.scss'

const Twitter = ({account}) => (
  <div className='twitter'>
    <TwitterTimelineEmbed
    sourceType="profile"
    screenName={account}
    options={{width: '100%',height: 500}}
    theme='light'
    transparent
    noFooter
    />
  </div>
);


export default Twitter;
