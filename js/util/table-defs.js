class Table {
  constructor(id, opts) {
    this.id = id;
    this.table = $(id);

    // immediately construct table
    this.table.DataTable(opts);
  }

  setData(data) {
    this.table.DataTable().clear();
    this.table.DataTable().rows.add(data);
    this.table.DataTable().draw();
  }

  // if the data is coming in as an object not an array
  setDataFromObject(data) {
    let dataArr = [];
    for (var key in data) {
      data[key].key = key;
      dataArr.push(data[key]);
    }

    this.setData(dataArr);
  }
}

function playerVsWinPctData(row) {
  if (row.wins)
    return row.wins / row.games;
  else if (row.defeated)
    return row.defeated / row.games;

  return 0;
}

function heroImage(name) {
  return `assets/heroes-talents/images/heroes/${Heroes.heroIcon(name)}`;
}

function heroHeader(heroName) {
  return `
    <h3 class="ui image inverted header">
      <img src="${heroImage(heroName)}" class="ui rounded image">
      <div class="content">
        ${heroName}
      </div>
    </h3>
  `;
}

const PlayerVsTableFormat = {
  columns: [
    {
      title: 'Hero',
      data: 'name',
      render: (data) => heroHeader(data)
    },
    {
      title: 'Win %',
      data: playerVsWinPctData,
      render: (data) => formatStat('pct', data)
    },
    {
      title: 'Games',
      data: 'games'
    }
  ],
  order: [[1, 'desc'], [2, 'desc']],
  paging: false,
  searching: false,
  scrollY: 450,
  info: false,
  responsive: true
};

const PlayerVsPlayerFormat = {
  columns: [
    {
      title: 'Player',
      data: 'name'
    },
    {
      title: 'Win %',
      data: playerVsWinPctData,
      render: (data) => formatStat('pct', data)
    },
    {
      title: 'Games',
      data: 'games'
    }
  ],
  order: [[1, 'desc'], [2, 'desc']],
  paging: true,
  pageLength: 50,
  searching: true,
  info: true,
  scrollY: 360,
  responsive: true
};

const SkinFormat = {
  columns: [
    {
      title: 'Skin ID',
      data: 'key'
    },
    {
      title: 'Win %',
      data: playerVsWinPctData,
      render: (data) => formatStat('pct', data)
    },
    {
      title: 'Games',
      data: 'games'
    }
  ],
  order: [[1, 'desc'], [2, 'desc']],
  paging: true,
  searching: true,
  info: true,
  scrollY: 360,
  pageLength: 50,
  responsive: true
};


exports.Table = Table;
exports.PlayerVsTableFormat = PlayerVsTableFormat;
exports.PlayerVsPlayerFormat = PlayerVsPlayerFormat;
exports.SkinFormat = SkinFormat;