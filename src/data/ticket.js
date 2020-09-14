import React from 'react'

export const ticketInfo = () => (
  <div className='tickets-info'>
    <h3>チケット情報</h3>
    <p><b>先行予約チケット（自由席・無料）</b></p>
    <p><b>当日チケット（自由席・無料）</b></p>
    <ul>
      <li>当日チケットの引き換えは当日 13:00 より開始します。</li>
      <li>当日チケットの枚数は先行予約チケットの状況に応じて変動するため、予めご了承ください。</li>
    </ul>
    <p>本公演では未就学児のゲストの方もご来場して頂くことが出来ます。予めご了承ください。また、未就学児をお連れのゲストの方は演奏中、周りの方にご配慮頂きますようお願いいたします。</p>
  </div>
)

export const ticketTypes = [ "大人", "子供" ]
export const ticketMax = 5
