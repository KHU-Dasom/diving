/*global chrome*/

import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie'
import searchIcon from '../../images/search-icon.svg';

export default function Finder() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const questionInputRef = useRef(null);

  const onClickQuestion = async () => {
    const openApiUrl = 'http://aiopen.etri.re.kr:8000/MRCServlet';
    var access_key =  'a8f03951-49f0-457a-bd7e-1ed6e6b9029f';
    var passage = "지난 9월 27일 정치외교학과 20학번 함형석 학생이 '제7회 전국 대학생 토론대회'에서 대상인 국가보훈처장상을 받았다. 함형석 학생은 국민대학교 정치외교학과 학생 두 명과 팀을 이뤄 대회에 출전했다. 대학 연합팀이라는 점과 우리 대학 신입생의 도전이라는 점에서 눈에 띈다. 이들은 4·19혁명을 바탕으로 '민주주의'에 관해 논했다. 민주주의 중에서도 가장 시급하게 공론화할 부분으로 '주거 민주화'를 꼽았다. 이번 토론대회는 4·19혁명국민문화제가 주관하고 서울특별시 강북구가 주최, 국가보훈처와 서울시, 서울시교육청, KBS가 후원했다."
    // var passage = `프로야구 두산 베어스가 6년 연속 한국시리즈에 진출했다. 통산 14번째다.
    // 두산은 13일 서울 고척스카이돔에서 열린 2020 케이비오(KBO) 플레이오프(3선승제) 4차전에서 케이티(KT) 위즈를 2-0으로 꺾고 3승 1패를 기록해, 정규리그 1위 엔씨(NC) 다이노스와 왕좌를 놓고 겨루게 됐다. 한국시리즈 1차전은 오는 17일 저녁 6시30분 같은 장소에서 열린다.
    // 승부를 일찍 끝내고 하루라도 휴식을 취해야 하는 두산과 2패로 벼랑 끝에 몰린 케이티는 동원 가능한 모든 투수를 마운드에 올리는 투수 총력전을 펼쳤다. 양 팀이 투수만 9명(두산 4명, 케이티 5명)을 출전시켰다.`

    var requestJson = {
    'access_key': access_key,
        'argument': {
            'question': question,
            'passage': passage
        }
    };
    
    var options = {
        body: JSON.stringify(requestJson),
        headers: {'Content-Type':'application/json; charset=UTF-8'}
        };
    const response = await axios.post(openApiUrl,{
      access_key: access_key,
      argument: {
    	question: question,
    	passage: passage
      }
    });
    setAnswer(response.data.return_object.MRCInfo.answer);
  }

  return (
      <div style={{ display: 'inline-block', border: '1px solid #9AA3A3', padding: '10px', boxShadow: '2px 1px #D9D9D9', width: '300px' }}>
      <h3>Diving</h3>
        <input
        type="text"
        style={{ border: 'none',background: 'transparent',  outline: 'black', fontSize: '16px', width: '200px', paddingLeft: '1em' }}
        placeholder="무엇이 궁금하세요?"
        value={question}
        onChange={event => setQuestion(event.target.value)}/>
        <button style={{ border: 'none', outline: 'none', margin: 0, padding: '0 0.5em', overflow: 'visible', background: 'transparent', color: 'inherit', font: 'inherit' }}
        onClick={onClickQuestion}>
          <img src={searchIcon} style={{ marginBottom: '5px'}} alt="search"/>
          </button>
      <p>{answer}</p>
      </div>
  );
}
