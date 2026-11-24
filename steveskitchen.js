const h = React.createElement;
const { useState } = React;


const WEEK_START = [2026, 11, 23];
const WEEK_LABEL = 'November 23–27.';
const WEEKLY_DISH = 'Rántott sajt, jázminrizs, tartár';

const MENU = [
  { day: 'Hétfő',     soup: 'Karfiolleves',                          a: 'Császármorzsa, barackíz',     b: 'Lecsós szelet, tarhonya' },
  { day: 'Kedd',      soup: 'Sajtkrémleves pirított zsemlekockával', a: 'Tepsis mákos guba',           b: 'Csirkemellborzaska, amerikai káposztasaláta' },
  { day: 'Szerda',    soup: 'Nyírségi gombócleves',                  a: 'Eperlekváros gombóc',         b: 'Sült oldalas, hagymás törtburgonya' },
  { day: 'Csütörtök', soup: 'Májgombócleves',                        a: 'Máglyarakás',                 b: 'Bácskai rizses hús' },
  { day: 'Péntek',    soup: 'Gulyásleves',                           a: 'Hortobágyi húsos palacsinta', b: 'Sült csirkecomb, hasáb, lilakáposzta-püré' },
];

const PRICES = [
  ['Csak leves', 1100],
  ['Csak főétel „A”', 1900],
  ['Csak főétel „B”', 2100],
  ['Heti menü (csak főétel)', 2300],
  ['Teljes „A” menü (leves + főétel)', 2400],
  ['Teljes „B” menü (leves + főétel)', 2900],
  ['Teljes heti menü (leves + főétel)', 2700],
  ['Savanyúság', 350],
  ['Csomagolás (darabonként)', 150],
];


function formatPrice(amount) {
  return amount.toLocaleString('hu-HU') + ' Ft';
}


function getTodayIndex() {
  const [year, month, day] = WEEK_START;
  const start = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((today - start) / (1000 * 60 * 60 * 24));
  return diff >= 0 && diff < MENU.length ? diff : -1;
}



function Header() {
  return h('header', null,
    h('h1', null, "Steve's Kitchen & Pub"),
    h('p', null, 'Heti menü • ' + WEEK_LABEL)
  );
}

function DayButtons({ selected, onSelect, today }) {
  const buttons = [{ label: 'Egész hét', value: 'all' }];
  MENU.forEach((row, i) => buttons.push({ label: row.day, value: i }));

  return h('div', { className: 'days' },
    buttons.map((btn) =>
      h('button', {
        key: btn.value,
        className: selected === btn.value ? 'active' : '',
        onClick: () => onSelect(btn.value),
      }, btn.label + (btn.value === today ? ' (ma)' : ''))
    )
  );
}

function MenuTable({ selected, today }) {
  const rows = MENU
    .map((row, i) => ({ ...row, index: i }))
    .filter((row) => selected === 'all' || row.index === selected);

  const headers = ['Nap', 'Leves', '„A” menü', '„B” menü', 'Heti menü'];

  return h('div', { className: 'table-wrap' },
    h('table', { className: 'menu' },
      h('thead', null,
        h('tr', null, headers.map((title) => h('th', { key: title }, title)))
      ),
      h('tbody', null,
        rows.map((row) =>
          h('tr', { key: row.day, className: row.index === today ? 'today' : '' },
            h('td', null, h('strong', null, row.day + (row.index === today ? ' (ma)' : ''))),
            h('td', null, row.soup),
            h('td', null, row.a),
            h('td', null, row.b),
            h('td', null, WEEKLY_DISH)
          )
        )
      )
    )
  );
}

function PriceList() {
  return h('table', { className: 'prices' },
    h('tbody', null,
      PRICES.map(([name, price]) =>
        h('tr', { key: name },
          h('td', null, name),
          h('td', null, formatPrice(price))
        )
      )
    )
  );
}

function OrderInfo() {
  return h('ul', { className: 'info' },
    h('li', null,
      h('strong', null, 'Rendelésleadás: '),
      'reggel 8:00-tól a ',
      h('a', { href: 'tel:+36707747308' }, '06 70 774 7308'),
      '-as számon'
    ),
    h('li', null, h('strong', null, 'Elvitel és átvétel: '), '11:00-tól'),
    h('li', null, h('strong', null, 'Cím: '), '8000 Székesfehérvár, Budai út 12.')
  );
}

function App() {
  const today = getTodayIndex();
  const [selected, setSelected] = useState('all');

  return h('div', { className: 'page' },
    h(Header),
    h('h2', null, 'Heti menü'),
    h(DayButtons, { selected: selected, onSelect: setSelected, today: today }),
    h(MenuTable, { selected: selected, today: today }),

    h('div', { className: 'pricing-order-grid' },
      h('section', { className: 'pricing-section' },
        h('h2', null, 'Árak'),
        h(PriceList)
      ),
      h('section', { className: 'order-section' },
        h('h2', null, 'Rendelés és átvétel'),
        h(OrderInfo)
      )
    ),

    h('footer', null, "Jó étvágyat kíván a Steve's Kitchen & Pub!")
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(h(App));
