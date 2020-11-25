/*global chrome*/

import React, { useState, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie'
import searchIcon from '../../images/search-icon.svg';
import logo from '../../logo_icon.png';

export default function Finder() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const questionInputRef = useRef(null);

  const onClickQuestion = async () => {
    const openApiUrl = 'http://aiopen.etri.re.kr:8000/MRCServlet';
    var access_key =  'a8f03951-49f0-457a-bd7e-1ed6e6b9029f';
    var passage = window.location.href;

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
      <div style={{ textAlign: 'center',display: 'inline-block', border: '1px solid #9AA3A3', padding: '10px', boxShadow: '2px 1px #D9D9D9', width: '300px' }}>
        <div style={{ marginBottom: '10px' }}>
          <img style={{ width: '250px', height: '100px', objectFit: 'cover'}} src={logo} alt={'logo'} />
        </div>
        <div style={{ display: 'inline-block', border: '1px solid #9AA3A3', borderRadius: '50px', padding: '10px', boxShadow: '2px 1px #D9D9D9' }}>
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
        </div>
        <h5 style={{ textAlign: 'left', marginLeft: '15px' }}>{answer}</h5>
      </div>
  );
}
