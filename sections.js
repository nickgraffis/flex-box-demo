const sectionTitles = [
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-700 mr-4">
      <div class="flex flex-wrap" style="padding: 3px;">
        <div class="flex justify-center items-center rounded-sm border-2 border-gray-300 text-gray-500 font-semibold text-xs" style="height: 13px; width: 13px;">f</div>
        <div class="h-2 w-2 flex justify-center items-center rounded-sm border-2 border-gray-300 text-gray-500 font-semibold text-xs" style="height: 13px; width: 13px;">l</div>
        <div class="h-2 w-2 flex justify-center items-center rounded-sm border-2 border-gray-300 text-gray-500 font-semibold text-xs" style="height: 13px; width: 13px;">e</div>
        <div class="h-2 w-2 flex justify-center items-center rounded-sm border-2 border-gray-300 text-gray-500 font-semibold text-xs" style="height: 13px; width: 13px;">x</div>
      </div>
    </div>`,
    title: 'display',
    color: 'blue',
    buttons: [0]
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-700 mr-4">
      <div class="flex flex-wrap" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <span class="text-sm"><i class="fas fa-long-arrow-alt-down"></i></span>
        <span class="text-sm" style="margin-top: -5px;"><i class="fas fa-long-arrow-alt-right"></i></span>
      </div>
    </div>`,
    title: 'flex-direction',
    color: 'blue',
    buttons: [1],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-700 mr-4">
      <div class="flex flex-wrap" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <span class="w-11/12 rounded-sm bg-gray-700" style="height: 2px; margin-top: 3px;"></span>
        <span class="rounded-sm bg-gray-700" style="height: 6px; width: 2px; margin-left: 84%;"></span>
        <span class="text-sm absolute"><i class="fas fa-long-arrow-alt-left" style="margin-top: 11px; margin-left: 10px;"></i></span>
      </div>
    </div>`,
    title: 'flex-wrap',
    color: 'red',
    buttons: [2],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-700 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <span class="text-sm"><i class="fas fa-arrows-alt"></i></span>
      </div>
    </div>`,
    title: 'flex-flow',
    color: 'gray',
    buttons: [3],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-700 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <span class="text-sm"><i class="fas fa-arrows-alt-h"></i></span>
      </div>
    </div>`,
    title: 'justify-content',
    color: 'green',
    buttons: [4],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-700 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <span class="text-sm"><i class="fas fa-arrows-alt-v"></i></span>
      </div>
    </div>`,
    title: 'align-items',
    color: 'pink',
    buttons: [5],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-700 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-300"></div>
        <span class="w-10/12 bg-gray-700 rounded-sm" style="height: 2px; margin-top: 3px;"></span>
        <span class="w-10/12 bg-gray-700 rounded-sm" style="height: 2px; margin-top: 3px;"></span>
        <span class="w-10/12 bg-gray-700 rounded-sm" style="height: 2px; margin-top: 3px;"></span>
      </div>
    </div>`,
    title: 'align-content',
    color: 'purple',
    buttons: [6],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-300 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
        <p class="text-xs text-gray-700 font-extrabold">1</p>
        <p class="text-xs text-gray-700 font-extrabold">2</p>
        <p class="text-xs text-gray-700 font-extrabold">3</p>
      </div>
    </div>`,
    title: 'order',
    color: 'purple',
    buttons: [7],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-300 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
        <div class="h-2 w-4 rounded-sm border-2 border-gray-700"></div>
      </div>
    </div>`,
    title: 'flex-grow',
    color: 'purple',
    buttons: [8],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-300 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
        <div class="h-2 w-4 rounded-sm border-2 border-gray-700"></div>
      </div>
    </div>`,
    title: 'flex-shrink',
    color: 'purple',
    buttons: [9],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-300 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
        <div class="h-2 w-4 rounded-sm border-2 border-gray-700"></div>
        <div class="flex" style="width: 8px; margin-left: 1px;">
          <span class="rounded-sm bg-gray-700" style="height: 6px; width: 2px; margin-top: 1px;"></span>
          <span class="rounded-sm bg-gray-700" style="height: 6px; width: 2px; margin-top: 1px; margin-left: 4px;"></span>
          <span class="rounded-sm bg-gray-700 absolute" style="height: 2px; width: 6px; margin-top: 5px;"></span>
        </div>
      </div>
    </div>`,
    title: 'flex-basis',
    color: 'purple',
    buttons: [10],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-300 mr-4">
      <div class="flex flex-wrap justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
        <div class="h-2 w-4 rounded-sm border-2 border-gray-700"></div>
        <div class="flex" style="width: 8px; margin-left: 1px;">
          <span class="rounded-sm bg-gray-700" style="height: 6px; width: 2px; margin-top: 1px;"></span>
          <span class="rounded-sm bg-gray-700" style="height: 6px; width: 2px; margin-top: 1px; margin-left: 4px;"></span>
          <span class="rounded-sm bg-gray-700 absolute" style="height: 2px; width: 6px; margin-top: 5px;"></span>
        </div>
      </div>
    </div>`,
    title: 'flex',
    color: 'purple',
    buttons: [11],
  },
  {
    icon: `<div class="h-10 w-10 rounded border-4 border-gray-300 mr-4">
      <div class="flex h-full justify-center" style="padding: 3px;">
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700 self-center"></div>
        <div class="h-2 w-2 rounded-sm border-2 border-gray-700"></div>
      </div>
    </div>`,
    title: 'align-self',
    color: 'purple',
    buttons: [12],
  },
];

const sectionIntros = [
  "To begin, set the contianer to <span class='bg-indigo-100 p-2 rounded-sm font-semibold font-mono text-indigo-500'>display: flex</span>! Then you're off and ready to go! Click next to learn about some of the properties!",
  "This establishes the main-axis, thus defining the direction <span class = 'bg-yellow-100 p-2 rounded-sm font-semibold font-mono text-yellow-500'>flex items</span> are placed in the <span class='bg-indigo-100 p-2 rounded-sm font-semibold font-mono text-indigo-400'>flex container</span>. Flexbox is (aside from optional wrapping) a single - direction layout concept.Think of flex items as primarily laying out either in horizontal rows or vertical columns.",
  "By default, <span class='bg-yellow-100 p-2 rounded-sm font-semibold font-mono text-yellow-500'>flex items</span> will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property.",
  "This is a shorthand for the <span class='bg-blue-100 p-2 rounded-sm font-semibold font-mono text-blue-500'> flex-direction</span> and <span class='bg-red-100 p-2 rounded-sm font-semibold font-mono text-red-500'> flex-wrap</span> properties, which together define the <span class='bg-indigo-100 p-2 rounded-sm font-semibold font-mono text-indigo-500'>flex container</span>’s main and cross axes. The default value is <span class = 'bg-red-100 p-2 rounded-sm font-semibold font-mono text-red 500'>row nowrap</span>.",
  "This defines the alignment along the main axis. It helps distribute extra free space leftover when either all the <span class = 'bg-yellow-100 p-2 rounded-sm font-semibold font-mono text-yellow-500' > flex items</span> on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.",
  "This defines the default behavior for how <span class='bg-yellow-100 p-2 rounded-sm font-semibold font-mono text-yellow-500'>flex items</span> are laid out along the <strong> cross-axis </strong> on the current line. Think of it as the <span class = 'bg-green-100 p-2 rounded-sm font-semibold font-mono text-green-500'> justify-content</span> version for the <strong> cross-axis </strong> (perpendicular to the <strong>main-axis</strong>).",
  "This aligns a <span class='bg-indigo-100 p-2 rounded-sm font-semibold font-mono text-indigo-500'>flex container</span>’s lines within when there is extra space in the <strong>cross-axis</strong>, similar to how <span class='bg-green-100 p-2 rounded-sm font-semibold font-mono text-green-500'>justify-content</span> aligns individual items within the <strong>main-axis</strong>.",
  "By default, flex items are laid out in the source order. However, the order property controls the order in which they appear in the flex container.",
  "This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up. If all items have flex-grow set to 1, the remaining space in the container will be distributed equally to all children. If one of the children has a value of 2, the remaining space would take up twice as much space as the others (or it will try to, at least).",
  "This defines the ability for a flex item to shrink if necessary.",
  "This defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means “look at my width or height property” (which was temporarily done by the main-size keyword until deprecated). The content keyword means “size it based on the item’s content” – this keyword isn’t well supported yet, so it’s hard to test and harder to know what its brethren max-content, min-content, and fit-content do.",
  "This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. The default is 0 1 auto, but if you set it with a single number value, it’s like 1 0.",
  "This allows the default alignment (or the one specified by align-items) to be overridden for individual flex items."
];

const sectionNotes = [
  "<div class='bg-green-100 text-green-500 border-l-8 p-4 leading-relaxed border-green-500'>Flexbox layout is most appropriate to the components of an application, and small-scale layouts, while the Grid layout is intended for larger scale layouts.</div>",
  "",
  "",
  "",
  "<div class='bg-green-100 text-green-500 border-l-8 p-4 leading-relaxed border-green-500'>Browser support varies here, the safest values are <span class='font-mono font-semibold underline text-green-800'>flex-start</span>, <span class='font-mono font-semibold underline text-green-800'>flex-end</span>, <span class='font-mono font-semibold underline text-green-800'>center</span>. There are also two additional keywords you can pair with these values: <span class='font-mono font-semibold underline text-green-800'>safe</span> and <span class='font-mono font-semibold underline text-green-800'>unsafe</span>. Using safe ensures that however you do this type of positioning, you can’t push an element such that it renders off-screen (e.g. off the top) in such a way the content can’t be scrolled too (called “data loss”).</div></div>",
  "<div class='bg-purple-100 text-purple-500 border-l-8 p-4 leading-relaxed border-purple-500'>This property only takes effect on multi-line flexible containers, where <span class='font-mono font-semibold underline text-purple-800'>flex-flow</span> is set to either <span class='font-mono font-semibold underline text-purple-800'>wrap</span> or <span class='font-mono font-semibold underline text-purple-800'>wrap-reverse</span>). A single-line flexible container (i.e. where <span class='font-mono font-semibold underline text-purple-800'>flex-flow</span> is set to its default value, <span class='font-mono font-semibold underline text-purple-800'>no-wrap</span>) will not reflect <span class='font-mono font-semibold underline text-purple-800'>align-content</span>.</div></div>",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];

const sectionButtons = [
  ['flex'],
  ['row', 'row-reverse', 'column', 'column-reverse'],
  ['nowrap', 'wrap', 'wrap-reverse'],
  ['row nowrap', 'row wrap', 'column wrap', 'column nowrap', 'row wrap-reverse', 'column wrap-reverse'],
  ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'start', 'end', 'left', 'right'],
  ['stretch','flex-start', 'flex-end', 'center', 'baseline'],
  ['normal', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-eveny', 'stretch'],
  [0, 1, 2, 3, 4],
  [0, 1, 2],
  [0, 1, 2],
  ['auto', 'content', 'max-content', 'min-content', 'fit-content', '0'],
  ['0 1 auto'],
  ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
]
