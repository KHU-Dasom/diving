/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Finder() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const questionInputRef = useRef(null);

  const onClickQuestion = async () => {
    const openApiUrl = 'http://aiopen.etri.re.kr:8000/MRCServlet';
    var access_key =  'a8f03951-49f0-457a-bd7e-1ed6e6b9029f';
    var passage = `추미애 법무부장관이 한동훈 검사장을 겨냥해 ‘피의자의 휴대전화 비밀번호 제공’을 강제하는 이른바 ‘추미애법’ 추진을 지시한 데 대해 법조계 뿐만 아니라 민변, 참여연대 등 친여(親與) 단체들에서도 “독재적, 초법적 발상”이란 비판이 쏟아지고 있다. 그러자 법무부는 13일 “'n번방 사건', 한동훈 검사장 사례 등을 계기로 디지털 증거에 대한 과학수사가 날로 중요해졌다”며 “(추미애법 추진은) 인터넷 상 아동 음란물 범죄, 사이버 테러 등 새로운 형태의 범죄에 관한 법집행이 무력해지는 데 대한 대책 마련이 필요하다는 고민이 있었기 때문”이라고 밝혔다. 추미애 법 추진은 온라인 성범죄 등에 대응하기 위한 것이라는 취지로 해석됐다.

    추미애 법무부 장관이 13일 서울 여의도 국회에서 열린 고위공직자범죄수사처(공수처) 처장 후보추천 위원회에 참석하고 있다. /이덕훈 기자
    추미애 법무부 장관이 13일 서울 여의도 국회에서 열린 고위공직자범죄수사처(공수처) 처장 후보추천 위원회에 참석하고 있다. /이덕훈 기자
    그러나 추 장관은 전날 이 법 제정을 지시하면서 한 검사장이 서울중앙지검에 압수된 자신의 휴대전화 비밀번호를 “악의적으로 숨기고 있다”고 했었다. 법조계에선 “윤석열 검찰총장 측근을 찍어내기 위해 ‘원포인트’ 법안을 만들라고 지시한 것이 문제가 되자 ‘n번방’ 등 다른 사례를 끌어들여 정당화하고 있다”며 “견강부회의 표본”이란 비판이 나왔다.
    `;
    
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
    console.log(response);
  }

  return (
    <>
      <h3>Diving</h3>
        <input
          placeholder="페이지 내에서 질문하기"
          value={question}
          onChange={event => setQuestion(event.target.value)}
        />
      <Button onClick={onClickQuestion}>질문</Button>
      <p>{answer}</p>
    </>
  );
}
