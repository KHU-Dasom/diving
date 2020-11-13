var $ = function(el){ 
	var Wrap = function(){};
	Wrap.prototype.set = function(prop, value, impo) {
		if( impo )
			el.style.setProperty(prop, value, "important");
		else
			el.style.setProperty(prop, value);
		return this;
	};
	return new Wrap();
};

var tooltip = {
  obj: null,
  timer: null,
  delay: 20,
  position: { x: 0, y:0 }
};

var div = tooltip.obj = document.createElement('div');
div.id = "diving-wiki";
$(div)
  .set('max-width', '50%')
  .set('font-size', '15px')
  .set('position', 'absolute', true)
  .set('z-index', '10000')
  .set('border', '1px solid #707070')
  .set('padding', '5px 10px', true)
  .set('background', 'linear-gradient(to bottom, #DCDCDC, #F0F0F0)', true)
  .set('box-shadow', '2px 2px 5px rgba(0,0,0,.4)');

document.body.appendChild(div);

async function find (event) {
  if( document.caretPositionFromPoint ) {
    var range = document.caretPositionFromPoint(event.clientX, event.clientY);
    var node = range.offsetNode;

    if( node && node.nodeType === 3 ) {
      text = node.textContent;
      offset = range.offset;
    }
  } else if( document.caretRangeFromPoint ) { // WebKit
    var range = document.caretRangeFromPoint(event.clientX, event.clientY);
    var node = range.startContainer; // or `range.commonAncestorContainer`
    if( node && node.nodeType === 3 ) {
      var goodbye = function(event){
        console.log(goodbye);
        event.target.removeEventListener('mouseleave', goodbye);
      };
      text = node.textContent;
      offset = range.startOffset;
    }
  }
  if( text ) {
    const result = parseWord(text, offset);
    console.log(result);
    tooltip.position.x = event.pageX;
    tooltip.position.y = event.pageY;
    show(div, await searchWiki(result));
  } else {
    hide(div);
  }
}

function parseWord(text, offset) {
  const words = text.split(' ');
  let length = 0;
  for(let i = 0; i < words.length; i++) {
    if (offset > length + i + words[i].length) {
      length += words[i].length;
    } else {
      return words[i];
    }
  }
  return words[words.length - 1];
};

async function searchWiki (question) {
  const requestJson = {
    'access_key': "a8f03951-49f0-457a-bd7e-1ed6e6b9029f",
    'argument': {
        'question': question,
        'type': 'hybridqa'
    }
  };
  let searchResult;
  await fetch('http://aiopen.etri.re.kr:8000/WikiQA', {
    method: 'POST',
    body: JSON.stringify(requestJson),
    headers: {
      'Content-Type':'application/json; charset=UTF-8'
    }
  }).then((res) => res.json()).then(result => { searchResult = result.return_object.WiKiInfo.AnswerInfo[0].answer }).catch(err => {searchResult = '정의를 찾지 못했습니다.'});
  return searchResult;
}


function show(div, text) {
	div.textContent = `🔍 ${text}`;
	$(div)
		.set('display', 'block')
		.set('left', this.tooltip.position.x + 'px')
		.set('top', this.tooltip.position.y + 20 + 'px');
};

function hide(div) {
	$(div).set('display', 'none');
};


// window.addEventListener('mousemove', find, true);
window.addEventListener('click', find, true);