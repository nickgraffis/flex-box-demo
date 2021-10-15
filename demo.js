const demo = document.querySelector(".demo");
const subTitleWrapper = document.querySelector('#sub-title-wrapper');
const subHashtag = document.querySelector('#sub-hashtag');
const subTitle = document.querySelector('#sub-title');
const subText = document.querySelector('#sub-text');
const subIcon = document.querySelector('#sub-icon');
const buttonsArea = document.querySelector('.buttons');
const boxCountDisplay = document.querySelector('#box-count');
const heightBar = document.querySelector('#height-bar');
const heightIndicator = document.querySelector('#height-indicator');
const heightRange = document.querySelector('#height-range');
const widthRange = document.querySelector('#width-range');
const widthBar = document.querySelector('#width-bar');
const widthIndicator = document.querySelector('#width-indicator');
const tableOfContents = document.querySelector('#table-of-contents');
const loader = document.querySelector('#loader');
const icons = document.querySelector('#icons');
const nextButtons = document.querySelector('#next-buttons');
const previousButtons = document.querySelector('#previous-buttons');
const currentButtons = document.querySelector('#current-buttons');

var boxCount = 0;
var position = 0;
var height = 3;
var width = 3;
var styleCode = 'css';
var boxes = [];
var visibleStyles = ['container'];
var visibleStylesLock = 'false';
var visibleParameters = ['display'];
var visibleParametersPowers = [{param: 'display', power: 'soft'}];
var showingTable = false;
var showingSearchBar = false;

class Router {
  routes = [];

  mode = null;

  root = '/';

  constructor(options) {
    this.mode = window.history.pushState ? 'history' : 'hash';
    if (options.mode) this.mode = options.mode;
    if (options.root) this.root = options.root;
    this.listen();
  }

  add = (path, cb) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = path => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  clearSlashes = path =>
    path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');

  getFragment = () => {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = '') => {
    if (this.mode === 'history') {
      window.history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  };

  listen = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval, 50);
  };

  interval = () => {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some(route => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  };
}

const router = new Router({
  mode: 'hash',
  root: '/'
});

router.add(/(.*)/, (section) => {
  if (!section) {
    position = 0;
    changeProgress();
    renderTOC();
    renderText(position);
    renderStyles();
    window.history.pushState({page: 1}, "title 1", '/#/' + sectionTitles[position].title);
  }
  let stylesList = sectionTitles.map(t => t.title);
  // if (!stylesList.includes(section)) {
  //   render404();
  // }
  position = stylesList.indexOf(section);

  if (position > -1) {
    if (visibleStylesLock === 'false') {
      if (position < 7) {
        visibleStyles = ['container'];
      } else {
        visibleStyles = [];
        boxes.forEach((box, index) => visibleStyles.push('box ' + index));
      }
    }
    changeVisibleParameters(sectionTitles[position].title, 'soft');
    changeProgress();
    renderTOC();
    renderText(position);
    renderStyles();
    if (showingTable) {
      let carrot = document.querySelector('#carrot-show-table');
      tableOfContents.style.height = '0px';
      carrot.style.transform = 'rotate(0deg)';
      setTimeout(() => {tableOfContents.style.visibility = 'hidden'}, 1000);
      showingTable = !showingTable;
    }
    if (showingSearchBar) {
      renderTOC();
      document.querySelector('#search-bar').classList.remove('w-6/12');
      showingTable = false;
      tableOfContents.style.height = '0px';
      setTimeout(() => {tableOfContents.style.visibility = 'hidden'}, 1000);
      showingSearchBar = !showingSearchBar;
    }
  }
});

class Style {
  constructor (styles){
    this.styles = styles,
    this.classes = Object.keys(this.styles).map(key => this.tailwindify(key, this.styles[key]))
  }

  add (style, value) {
    this.styles[style] = value;
    this.classes.push(this.tailwindify(style, value));
  }

  update (style, value) {
    this.swap(this.tailwindify(style, this.styles[style]), this.tailwindify(style, value));
    this.styles[style] = value;
  }

  remove (style) {
    delete this.styles[style];
  }

  swap (old, replacement) {
    if (this.classes.indexOf(old) > -1) {
      this.classes.splice(this.classes.indexOf(old), 1);
    }

    this.classes.push(replacement);
  }

  tailwindify (style, value) {
    let styleArray = style.split('-');
    if (styleArray.length === 1) {
      if (style === 'flex') {
        if (value === '0 1 auto') {
          return style + '-' + 'initial';
        } else if (value === '1 1 0%') {
          return style + '-' + '1';
        } else if (value === '1 1 auto') {
          return style + '-' + 'auto';
        } else {
          return style + '-' + 'none';
        }
      } else if (style === 'display') {
        return value;
      } else {
        return style + '-' + value;
      }
    } else {
      if (style === 'flex-direction') {
        let valueArray = value.split('-');
        if (valueArray.length > 1) {
          if (valueArray[0] === 'column') {
            return styleArray[0] + '-' + 'col' + '-' + valueArray[1];
          } else {
            return styleArray[0] + '-' + 'row' + '-' + valueArray[1];
          }
        } else {
          if (value === 'column') {
            return styleArray[0] + '-' + 'col';
          } else {
            return styleArray[0] + '-' + 'row';
          }
        }
      } else if (style === 'flex-flow') {
        return '';
      } else if (styleArray[0] === 'flex') {
        if (styleArray[1] === 'wrap') {
          return styleArray[0] + '-' + value;
        }
        if (value > 1) {
          return style + '-' + '>1';
        } else {
          return style + '-' + value;
        }
      } else if (styleArray[0] === 'justify') {
        let valueArray = value.split('-');
        if (valueArray.length > 1) {
          return styleArray[0] + '-' + valueArray[1];
        } else {
          return styleArray[0] + '-' + value;
        }
      } else if (styleArray[0] === 'align') {
        let valueArray = value.split('-');
        if (valueArray.length > 1) {
          return styleArray[1] + '-' + valueArray[1];
        } else {
          if (value === 'normal') {
            return '';
          }
          return styleArray[1] + '-' + value;
        }
      }
    }
  }
}

class Box {
  constructor () {
    this.styles = new Style ({
      'order': 0,
      'flex-grow': 0,
      'flex-shrink': 0,
      'flex-basis': 'auto',
      'flex': '0 1 auto',
      'align-self': 'flex-start'
    })
  }
}

const MyStyles = new Style({
  'display': 'flex',
  'flex-direction': 'row',
  'flex-wrap': 'nowrap',
  'flex-flow': 'row nowrap',
  'justify-content': 'flex-start',
  'align-items': 'flex-start',
  'align-content': 'normal'
});

function render404() {
  document.querySelector('#application_wrapper').innerHTML = `
  <div class="flex justify-center items-center w-full h-screen">
  <div class="w-24 h-24 rounded-xl text-white bg-yellow-500 flex justify-center items-center text-4xl font-extrabold mx-6">4</div>
  <div class="w-24 h-24 rounded-xl text-white bg-yellow-500 flex justify-center items-center text-4xl font-extrabold mx-6">0</div>
  <div class="w-24 h-24 rounded-xl text-white bg-yellow-500 flex justify-center items-center text-4xl font-extrabold mx-6">4</div>
  <div class="w-48 h-24 rounded-xl text-white bg-yellow-500 flex justify-center items-center text-4xl font-extrabold mx-6">¯\_(ツ)_/¯</div>
  </div>
  `
}

function changeVisibleParameters (param, power, options) {
  if (options != 'addonly') {
    for (let i = 0; i < visibleParametersPowers.length; i++) {
      if (visibleParametersPowers[i].power === 'soft') {
        for (let k = 0; k < visibleParameters.length; k++) {
          if (visibleParameters[k] === visibleParametersPowers[i].param) {
            visibleParameters.splice(k, 1);
          }
        }
        visibleParametersPowers.splice(i, 1);
      }
    }
  }
  if (!visibleParameters.includes(param)) {
    visibleParametersPowers.push({param, power});
    visibleParameters.push(param);
  }
}

function removeVisibleParameterHard (param) {
  for (let i = 0; i < visibleParametersPowers.length; i++) {
    if (visibleParametersPowers[i].param === param) {
      for (let k = 0; k < visibleParameters.length; k++) {
        if (visibleParameters[i] === visibleParametersPowers[i].param) {
          visibleParameters.splice(k, 1);
        }
      }
      visibleParametersPowers.splice(i, 1);
    }
  }
}

function changeProgress() {
  if (position === 12) loader.style.width = '100%';
  else loader.style.width = (position * 8.3) + '%';
}

function renderTOC() {
  tableOfContents.innerHTML = '';
  sectionTitles.forEach((t, i) => {
    if(i != position) {
      tableOfContents.innerHTML += `
    <div class="flex items-center justify-between mb-4 px-4 pt-4">
      <div class="flex items-center"><span class="text-gray-300 text-4xl font-semibold self-start mr-10 hover:text-gray-500 cursor-pointer"><a href="/#/${t.title}">#</a></span>
      ${t.icon}<span>${t.title}</span></div><span onclick="showThisClass(event)" id="${t.title}$style-show" class="font-mono self-end style-indicator cursor-pointer text-gray-300">{&nbsp;}</span>
    </div>
    `;
    }
  });
}

function renderText(item) {
  subTitle.innerHTML = sectionTitles[item].title;
  subIcon.innerHTML = sectionTitles[item].icon;
  subText.innerHTML = sectionIntros[item];
  // if(sectionNotes[item]) {
  //   let note = document.createElement('DIV');
  //   note.classList = 'flex items-center w-1/3';
  //   note.innerHTML = sectionNotes[item];
  //   document.getElementById('notes').innerHTML = note.outerHTML;
  // }
}

function renderBoxes() {
  for (let i = 0; i < 4; i++) {
    addBox();
  }
}

window.showThisClass = function (event) {
  let classToShow = event.currentTarget.id.split('$')[0];
  if (visibleParameters.includes(classToShow)) {
      removeVisibleParameterHard(classToShow);
      event.currentTarget.classList.remove('showing');
      event.currentTarget.classList.remove('text-gray-700');
  } else {
    changeVisibleParameters(classToShow, 'hard', 'addonly');
    event.currentTarget.classList.add('showing');
    event.currentTarget.classList.add('text-gray-700');
  }
  renderStyles();
}

window.changeStyle = function(type) {
  if (styleCode === type) {
    return false;
  }
  if (type === 'css') {
    document.querySelector('#css').style.zIndex = 10;
    document.querySelector('#css').classList.remove('bg-gray-400');
    document.querySelector('#css').classList.add('bg-gray-600');
    document.querySelector('#tailwind').classList.remove('bg-gray-600');
    document.querySelector('#tailwind').classList.add('bg-gray-400');
    document.querySelector('#tailwind').style.zIndex = 1;
    styleCode = 'css';
    renderStyles();
  } else {
    document.querySelector('#tailwind').style.zIndex = 10;
    document.querySelector('#tailwind').classList.remove('bg-gray-400');
    document.querySelector('#tailwind').classList.add('bg-gray-600');
    document.querySelector('#css').classList.remove('bg-gray-600');
    document.querySelector('#css').classList.add('bg-gray-400');
    document.querySelector('#css').style.zIndex = 1;
    styleCode = 'tailwind';
    renderStyles();
  }
}

window.incrementStyle = function (style, target) {
  let stylesList = sectionTitles.map(t => t.title);
  let sectionId = stylesList.indexOf(style);
  let newValue = boxes[target - 1].styles.styles[style] + 1;
  if (sectionButtons[sectionId].includes(newValue)) {
    changeBox(style, newValue, target);
  }
}

function incrementPossible (style, target) {
  let stylesList = sectionTitles.map(t => t.title);
  let sectionId = stylesList.indexOf(style);
  let newValue = boxes[target - 1].styles.styles[style] + 1;
  if (sectionButtons[sectionId].includes(newValue)) {
    return true;
  } else {
    return false;
  }
}

window.decrementStyle = function (style, target) {
  let stylesList = sectionTitles.map(t => t.title);
  let sectionId = stylesList.indexOf(style);
  let newValue = boxes[target - 1].styles.styles[style] - 1;
  if (sectionButtons[sectionId].includes(newValue)) {
    changeBox(style, newValue, target);
  }
}

function decrementPossible (style, target) {
  let stylesList = sectionTitles.map(t => t.title);
  let sectionId = stylesList.indexOf(style);
  let newValue = boxes[target - 1].styles.styles[style] - 1;
  if (sectionButtons[sectionId].includes(newValue)) {
    return true;
  } else {
    return false;
  }
}

function boldIndicators () {
  let indicators = document.getElementsByClassName('style-indicator');
  for (let i = 0; i < indicators.length; i++) {
    if (indicators[i].classList.value.includes('showing')) {
      if (!visibleParameters.includes(indicators[i].id.split('$')[0])) {
        indicators[i].classList.remove('text-gray-700');
        indicators[i].classList.remove('showing');
      }
    } else {
      if (visibleParameters.includes(indicators[i].id.split('$')[0])) {
        indicators[i].classList.add('text-gray-700');
        indicators[i].classList.add('showing');
      }
    }
  }
}

function displayContainerProperties() {
  let innerCode = document.querySelector('#inner-code');
  innerCode.innerHTML = '';
  innerCode.innerHTML += `<span class="text-green-300">.flex-container <span class="text-gray-300">{<br><span id="style"></span>}</span></span>`;
  let style = document.querySelector('#style');
   style.innerHTML = '';
   for (let k = 0; k < visibleParameters.length; k++) {
     if (MyStyles.styles[visibleParameters[k]]) {
       let stylesList = sectionTitles.map(t => t.title);
       style.innerHTML += `
       <span class="text-red-300 flex">&nbsp;&nbsp;${visibleParameters[k]}:&nbsp;
       <div class="text-white ${visibleParameters[k]}-style-display cursor-pointer relative w-48" onclick="showStyleButtons(event, ${sectionButtons[stylesList.indexOf(visibleParameters[k])].length})">
         <span>${MyStyles.styles[visibleParameters[k]]} </span><span class="transform inline-block style-arrow">&gt;</span>
           <ul class="appearance-none absolute style-list z-10 bg-gray-600 n-hiden" style="height: 0px; overflow: hidden;">
             ${sectionButtons[stylesList.indexOf(visibleParameters[k])].map((i) => `<li onclick="change('${visibleParameters[k]}', '${i}')" class="hover:bg-gray-500" style="padding: 2px;">${i}</li>`).join('')}
             </ul>
       </div><br></span>`;
     }
   }
}

function addToDisplayContainerProperties() {
  let innerCode = document.querySelector('#inner-code');
  innerCode.innerHTML += `<br><span class="text-green-300">.flex-container <span class="text-gray-300">{<br><span id="style"></span>}</span></span>`;
  let style = document.querySelector('#style');
   style.innerHTML = '';
   for (let k = 0; k < visibleParameters.length; k++) {
     if (MyStyles.styles[visibleParameters[k]]) {
       let stylesList = sectionTitles.map(t => t.title);
       style.innerHTML += `
       <span class="text-red-300 flex">&nbsp;&nbsp;${visibleParameters[k]}:&nbsp;
       <div class="text-white ${visibleParameters[k]}-style-display cursor-pointer relative w-48" onclick="showStyleButtons(event, ${sectionButtons[stylesList.indexOf(visibleParameters[k])].length})">
         <span>${MyStyles.styles[visibleParameters[k]]} </span><span class="transform inline-block style-arrow">&gt;</span>
           <ul class="appearance-none absolute style-list z-10 bg-gray-600 n-hiden" style="height: 0px; overflow: hidden;">
             ${sectionButtons[stylesList.indexOf(visibleParameters[k])].map((i) => `<li onclick="change('${visibleParameters[k]}', '${i}')" class="hover:bg-gray-500" style="padding: 2px;">${i}</li>`).join('')}
             </ul>
       </div><br></span>`;
     }
   }
}

function displayContainerTailwindHTML() {
  document.querySelector('#inner-code').innerHTML = `<span class="text-red-300">&lt;div</span><span id="style" class="text-green-300"><span class="text-yellow-400"> class="</span></span><span class="text-red-300">&gt;<span id="box_styles"></span>&lt;/div&gt;</span>`;
  let style = document.querySelector('#style');
  MyStyles.classes.forEach((c, i) => style.innerHTML += `${c}${i === MyStyles.classes.length - 1 ? '</span><span class="text-yellow-400">"</span></span>' : ' '}`);
}

function displayOneBoxesProperties (i) {
  document.querySelector('#inner-code').innerHTML += `<span class="text-green-300"><br>.flex-contianer:nth-child(${i + 1}) <span class="text-gray-300">{<br>
    <span id="style-${i + 1}"></span>
  }</span></span>`;
  let boxStyles = document.querySelector('#style-' + (i + 1));
  boxStyles.innerHTML = '';
  for (let k = 0; k < visibleParameters.length; k++) {
    let stylesList = sectionTitles.map(t => t.title);
    if (boxes[i].styles.styles[visibleParameters[k]] != null) {
      let stylesList = sectionTitles.map(t => t.title);
      if (['order', 'flex-grow', 'flex-shrink'].includes(visibleParameters[k])) {
        boxStyles.innerHTML += `
        <span class="text-red-300 flex">&nbsp;&nbsp;${visibleParameters[k]}:&nbsp;
        <div class="text-white ${visibleParameters[k]}-style-display-${i + 1} relative w-48">
          <span>${boxes[i].styles.styles[visibleParameters[k]]} </span><span class="transform inline-block">${decrementPossible(visibleParameters[k], (i + 1)) ? `<span class="cursor-pointer" onclick="decrementStyle('${visibleParameters[k]}', ${i + 1})">-</span>` : ''}&nbsp;${incrementPossible(visibleParameters[k], (i + 1)) ? `<span class="cursor-pointer" onclick="incrementStyle('${visibleParameters[k]}', ${i + 1})">+</span></span>` : ''}
        </div><br></span>`;
      } else {
        boxStyles.innerHTML += `
        <span class="text-red-300 flex">&nbsp;&nbsp;${visibleParameters[k]}:&nbsp;
        <div class="text-white ${visibleParameters[k]}-style-display-${i + 1} cursor-pointer relative w-48" onclick="showStyleButtons(event, ${sectionButtons[stylesList.indexOf(visibleParameters[k])].length})">
          <span>${boxes[i].styles.styles[visibleParameters[k]]} </span><span class="transform inline-block style-arrow">&gt;</span>
            <ul class="appearance-none absolute style-list z-10 bg-gray-600 n-hiden" style="height: 0px; overflow: hidden;">
              ${sectionButtons[stylesList.indexOf(visibleParameters[k])].map((index) => `<li onclick="changeBox('${visibleParameters[k]}', '${index}', ${i + 1})" class="hover:bg-gray-500" style="padding: 2px;">${index}</li>`).join('')}
              </ul>
        </div><br></span>`;
      }
    }
  }
}

function displayOneBoxesTailwindHTML (i) {
  if (visibleStyles[i] != 'contianer') {
    let boxDivContainer = document.querySelector('#box_styles');
    boxDivContainer.innerHTML += `<br>&nbsp;&nbsp;<span class="text-red-300">&lt;div</span><span id="style-box-${i + 1}" class="text-green-300"><span class="text-yellow-400"> class="</span></span><span class="text-red-300">&gt;&lt;/div&gt;</span>`;
    let thisBoxStyle = document.querySelector('#style-box-' + (i + 1));
    boxes[i].styles.classes.forEach((c, index) => thisBoxStyle.innerHTML += `${c}${index === boxes[i].styles.classes.length - 1 ? '</span><span class="text-yellow-400">"</span></span>' : ' '}`);
    boxDivContainer.innerHTML += `<br>`;
  }
}

function renderStyles  () {
    boldIndicators();
    for (let j = 0; j < visibleStyles.length; j++) {
      if (styleCode === 'css') {
        if (visibleStyles[j] === 'container') {
          displayContainerProperties();
        } else {
          document.querySelector('#inner-code').innerHTML = '';
          if (visibleStylesLock != 'false') {
            let i = visibleStylesLock;
            displayOneBoxesProperties(i);
            if(visibleStyles[i] === 'container') {
              addToDisplayContainerProperties();
            }
          } else {
            for (let i = 0; i < boxes.length; i++) {
              displayOneBoxesProperties(i);
            }
          }
        }
      } else {
        displayContainerTailwindHTML();
        if (visibleStylesLock != 'false') {
          let i = visibleStylesLock;
          displayOneBoxesTailwindHTML(i);
        } else {
          if (visibleStyles[j] != 'container') {
            for (let i = 0; i < visibleStyles.length; i++) {
              displayOneBoxesTailwindHTML(i);
            }
          }
        }
      }
    }
}

window.focusOnBox = function (id) {
  if (visibleStylesLock === id) {
    demo.children[id].classList = 'm-2 box bg-yellow-500 z-10 rounded text-lg text-white flex justify-center items-center font-extrabold cursor-pointer';
    visibleStyles = [];
    visibleStylesLock = 'false';
    if (position < 7) {
      visibleStyles = ['container'];
    } else {
      visibleStyles = [];
      boxes.forEach((box, index) => visibleStyles.push('box ' + index));
    }
  } else {
    let allBoxes = demo.children;
    for (let i = 0; i < allBoxes.length; i++) {
      if (allBoxes[i].classList.value.includes('focused')) {
        allBoxes[i].classList = 'm-2 box bg-yellow-500 z-10 rounded text-lg text-white flex justify-center items-center font-extrabold cursor-pointer';
      }
    }
    let box = demo.children[id].classList = 'm-2 box bg-white border-4 border-yellow-500 focused z-10 rounded text-lg text-yellow-500 flex justify-center items-center font-extrabold cursor-pointer';
    visibleStyles = [];
    visibleStylesLock = id;
    visibleStyles.push('box ' + id);
  }
  renderStyles();
}

window.showStyleButtons = function (event, items) {
  let target = event.currentTarget.querySelector('.style-list');
  let arrow = event.currentTarget.querySelector('.style-arrow');
  if (target) {
    if (target.classList.value.includes('n-hiden')) {
      target.classList.remove('n-hiden');
      target.style.height = (items * 28) + 'px';
      arrow.classList.add('rotate-90');
    } else {
      target.style.height = '1px';
      arrow.classList.remove('rotate-90');
      setTimeout(() => {target.classList.add('n-hiden')}, 500);
    }
  }
}

window.showTableOfContents = function (event) {
  if (showingTable) {
    tableOfContents.style.height = '0px';
    event.currentTarget.style.transform = 'rotate(0deg)';
    setTimeout(() => {tableOfContents.style.visibility = 'hidden'}, 1000);
  } else {
    event.currentTarget.style.transform = 'rotate(90deg)';
    tableOfContents.style.visibility = 'visible';
    tableOfContents.style.height = '500px';
  }

  showingTable = !showingTable;
}

window.change = function (style, value) {
  let demoStyle = demo.style;
  let styleSelector = document.querySelector('.' + style + '-style-display');
  MyStyles.update(style, value);
  renderStyles();
  styleSelector.children[0].innerHTML = value + '&nbsp;';
  demoStyle[style] = value;
}

window.changeBox = function (style, value, id) {
  let allBoxes = document.getElementsByClassName('box');
  let thisBox = allBoxes[id - 1];
  let thisBoxStyle = thisBox.style;
  let styleSelector = document.querySelector('.' + style + '-style-display-' + id);
  boxes[id - 1].styles.update(style, value);
  renderStyles();
  styleSelector.children[0].innerHTML = value + '&nbsp;';
  thisBoxStyle[style] = value;
}

window.addBox = function () {
  demo.innerHTML +=
  `<div onclick="focusOnBox(${boxCount})" class="m-2 box bg-yellow-500 z-10 rounded text-lg text-white flex justify-center items-center font-extrabold cursor-pointer" style="height: ${height}rem; width: ${width}rem;">${boxCount + 1}</div>`;
  boxCount++;
  boxes.push(new Box());
  boxCountDisplay.innerHTML = boxCount;
  renderStyles();
}

window.removeBox = function () {
  if (boxCount === 0) { return; };
  demo.lastChild.remove();
  boxCount--;
  boxCountDisplay.innerHTML = boxCount;
  boxes.splice(-1,1);
  renderStyles();
}

window.next = function () {
  if (position === sectionTitles.length - 1) {
    return false;
  }
  position++;
  window.history.pushState({page: 1}, "title 1", '/#/' + sectionTitles[position].title);
}

window.back = function () {
  if (position === 0) {
    return false;
  }
  position--;
  window.history.pushState({page: 1}, "title 1", '/#/' + sectionTitles[position].title);
}

window.showSearchBar = function () {
  if (showingSearchBar) {
    renderTOC();
    document.querySelector('#search-bar').classList.remove('w-6/12');
    showingTable = false;
    tableOfContents.style.height = '0px';
    setTimeout(() => {tableOfContents.style.visibility = 'hidden'}, 1000);
  } else {
    document.querySelector('#search-bar').classList.add('w-6/12');
  }
  showingSearchBar = !showingSearchBar;
}

widthRange.addEventListener("mouseup", function () {
  let boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.width = this.value + 'rem';;
  }
  widthIndicator.innerHTML = this.value + 'rem;';
  if (this.value == 10) {
    widthBar.style.width = '99%';
  } else if (this.value == 1) {
    widthBar.style.width = '0%';
  } else {
    widthBar.style.width = ((this.value * 10) - 5) + '%';
  }
  width = this.value;
});

heightRange.addEventListener("mouseup", function () {
  let boxes = document.getElementsByClassName('box');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.height = this.value + 'rem';;
  }
  heightIndicator.innerHTML = this.value + 'rem;';
  if (this.value == 10) {
    heightBar.style.width = '99%';
  } else if (this.value == 1) {
    heightBar.style.width = '0%';
  } else {
    heightBar.style.width = ((this.value * 10) - 5) + '%';
  }
  height = this.value;
});

document.querySelector('#search-bar').addEventListener("keyup", function () {
  let searchResults;
  if (!this.value) {
    searchResults = [];
  } else {
    searchResults = sectionTitles.filter(section => section.title.includes(this.value));
  }
  tableOfContents.innerHTML = '';
  searchResults.forEach((t, i) => {
      tableOfContents.innerHTML += `
    <div class="flex items-center mb-4 px-4 pt-4">
      <span class="text-gray-300 text-4xl font-semibold mr-12 hover:text-gray-500 cursor-pointer"><a href="/#/${t.title}">#</a></span>
      ${t.icon}<span>${t.title}</span>
    </div>
    `;
  });
  if (showingTable) {
    tableOfContents.style.height = 'auto';
  } else {
    tableOfContents.style.visibility = 'visible';
    tableOfContents.style.height = 'auto';
  }
})

window.toggleModal = function() {
  let modal = document.querySelector('#modal');
  if(modal.classList.value.includes('hidden')) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

window.showBasicTerms = function() {
  let popup = document.querySelector('#popup-content');
  popup.innerHTML = `
    <p class="text-3xl font-extrabold text-gray-700 text-center mb-2">Basics & Terminology</p>
    <p>Since flexbox is a whole module and not a single property, it involves a lot of things including its whole set of properties. Some of them are meant to be set on the container (parent element, known as “flex container”) whereas the others are meant to be set on the children (said “flex items”).</p>
    <br>
    <p>If “regular” layout is based on both block and inline flow directions, the flex layout is based on “flex-flow directions”. Please have a look at this figure from the specification, explaining the main idea behind the flex layout.</p>
    <br>
    <img src="https://css-tricks.com/wp-content/uploads/2018/11/00-basic-terminology.svg" />
    <p>Items will be laid out following either the main axis (from main-start to main-end) or the cross axis (from cross-start to cross-end).</p>
    <br>
    <ul>
    <li><strong>main axis</strong> – The main axis of a flex container is the primary axis along which flex items are laid out. Beware, it is not necessarily horizontal; it depends on the flex-direction property (see below).</li>
    <li><strong>main-start | main-end</strong> – The flex items are placed within the container starting from main-start and going to main-end.</li>
    <li><strong>main size</strong> – A flex item’s width or height, whichever is in the main dimension, is the item’s main size. The flex item’s main size property is either the ‘width’ or ‘height’ property, whichever is in the main dimension.</li>
    <li><strong>cross axis</strong> – The axis perpendicular to the main axis is called the cross axis. Its direction depends on the main axis direction.</li>
    <li><strong>cross-start | cross-end</strong> – Flex lines are filled with items and placed into the container starting on the cross-start side of the flex container and going toward the cross-end side.</li>
    <li><strong>cross size</strong> – The width or height of a flex item, whichever is in the cross dimension, is the item’s cross size. The cross size property is whichever of ‘width’ or ‘height’ that is in the cross dimension..</li>

    </ul>
  `;
  toggleModal();
}

window.showBackground = function() {
  let popup = document.querySelector('#popup-content');
  popup.innerHTML = `
    <p class="text-3xl font-extrabold text-gray-700 text-center mb-2">Flex Box Background</p>
    <p>The Flexbox Layout (Flexible Box) module (a <a class="hover:text-blue-400 italic" href="">W3C Candidate Recommendation</a> as of October 2017) aims at providing a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word “flex”).</p>
    <br>
    <p>The main idea behind the flex layout is to give the container the ability to alter its items’ width/height (and order) to best fill the available space (mostly to accommodate to all kind of display devices and screen sizes). A flex container expands items to fill available free space or shrinks them to prevent overflow.</p>
    <br>
    <p>Most importantly, the flexbox layout is direction-agnostic as opposed to the regular layouts (block which is vertically-based and inline which is horizontally-based). While those work well for pages, they lack flexibility (no pun intended) to support large or complex applications (especially when it comes to orientation changing, resizing, stretching, shrinking, etc.).</p>
    <br>
    <p><strong>Note:</strong> Flexbox layout is most appropriate to the components of an application, and small-scale layouts, while the Grid layout is intended for larger scale layouts.</p>
  `;
  toggleModal();
}

renderBoxes();

console.log('demo for changes to netlify site')