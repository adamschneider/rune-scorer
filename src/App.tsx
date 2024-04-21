import { useState } from 'react';
import './App.css';

/*
  +-------+-----------------+-----------+-----------+
  | Stars	|         Substat	| Min Value | Max Value |
  +-------+-----------------+-----------+-----------+
  |     6 |    HP           |       135 |       375 |
  |     6 |    HP %         |         5 |         8 |
  |     6 |    ATK          |        10 |        20 |
  |     6 |    ATK %        |         5 |         8 |
  |     6 |    DEF          |        10	|        20 |
  |     6 |    DEF %        |         5 |         8 |
  |     6 |    SPD          |         4 |         6 |
  |     6 |    CRI Rate %   |         4 |         6 |
  |     6 |    CRI Dmg %    |         4 |         7 |
  |     6 |    Resistance % |         4 |         8 |
  |     6 |    Accuracy %   |         4 |         8 |
  +-------+-----------------+-----------+-----------+
*/

const numberOfColumns = 30;

class Stat {
  constructor(
    public name: string,
    public minimum: number,
    public maximum: number,
    public weight: number,
    public main: number,
  ) { }
}

function RuneType({ stat, selected, onClick }: { stat: Stat, selected: boolean, onClick: () => void }) {
  let className = selected ? 'rune-type btn selected' : 'rune-type btn';
  return <span className={className} onClick={onClick}>{stat.name}</span>;
}

function StatRow({ stat, selected, onSelect, classes }: { stat: Stat, selected: number, onSelect: (value: number) => void, classes: string }) {

  let singleRoll: number[] = [0];
  for (let i = stat.minimum; i <= stat.maximum; i++) {
    singleRoll.push(i);
  }

  let rolls = new Set<number>();
  singleRoll.map(h => singleRoll.map(i => singleRoll.map(j => singleRoll.map(k => rolls.add(h + i + j + k)))));


  let elements: JSX.Element[] = [];
  rolls.forEach((_, r) => elements.push(<span className={r === selected ? `${classes} btn selected` : `btn ${classes}`} onClick={() => onSelect(r)}>{r}</span>));

  let spaces: JSX.Element[] = [];
  spaces.push(<span className={`${classes} filler`}></span>);

  return (
    <div className="stat-row">
      <span className={`label ${classes}`}>{stat.name}</span>
      {elements}
      {spaces}
    </div>
  )
}

const stats = {
  hp: new Stat("HP %", 5, 8, 1, 63),
  atk: new Stat("ATK %", 5, 8, 1, 63),
  def: new Stat("DEF  %", 5, 8, 1, 63),
  spd: new Stat("SPD", 4, 6, 2, 42),
  criRate: new Stat("CRI Rate %", 4, 6, 1.5, 58),
  criDmg: new Stat("CRI Dmg %", 4, 7, 1, 80),
  acc: new Stat("Acc %", 4, 8, 1, 64)
};

function App() {
  const [selectedRune, selectRune] = useState<Stat | undefined>();

  const [selectedHp, selectHp] = useState(0);
  const [selectedAtk, selectAtk] = useState(0);
  const [selectedDef, selectDef] = useState(0);
  const [selectedSpd, selectSpd] = useState(0);
  const [selectedCriRate, selectCriRate] = useState(0);
  const [selectedCriDmg, selectCriDmg] = useState(0);
  const [selectedAcc, selectAcc] = useState(0);

  const score = Math.ceil(
    (selectedRune ? selectedRune.main * selectedRune.weight : 0) +
    selectedHp * stats.hp.weight +
    selectedAtk * stats.atk.weight +
    selectedDef * stats.def.weight +
    selectedSpd * stats.spd.weight +
    selectedCriRate * stats.criRate.weight +
    selectedCriDmg * stats.criDmg.weight +
    selectedAcc * stats.acc.weight
  );

  const clear = () => {
    selectHp(0);
    selectAtk(0);
    selectDef(0);
    selectSpd(0);
    selectCriRate(0);
    selectCriDmg(0);
    selectAcc(0);
  }

  return (
    <div className="main">
      <div className="score-row">
        <span>Score</span><span className="score">{score}</span><span className="btn" onClick={clear}>Clear</span>
      </div>
      <div className="rune-type-row">
        <span className="label">Rune Type</span>
        <span className={selectedRune === undefined ? 'rune-type btn selected' : 'rune-type btn'} onClick={() => { selectRune(undefined); }}>Flat</span>
        {
          Object.values(stats).map(stat =>
            <RuneType stat={stat} selected={selectedRune === stat} onClick={() => selectRune(stat)} />
          )
        }
      </div>

      <StatRow stat={stats.hp} classes="odd" selected={selectedHp} onSelect={(hp: number) => selectHp(hp)} />
      <StatRow stat={stats.atk} classes="even" selected={selectedAtk} onSelect={(atk: number) => selectAtk(atk)} />
      <StatRow stat={stats.def} classes="odd" selected={selectedDef} onSelect={(def: number) => selectDef(def)} />
      <StatRow stat={stats.spd} classes="even" selected={selectedSpd} onSelect={(spd: number) => selectSpd(spd)} />
      <StatRow stat={stats.criRate} classes="odd" selected={selectedCriRate} onSelect={(criRate: number) => selectCriRate(criRate)} />
      <StatRow stat={stats.criDmg} classes="even" selected={selectedCriDmg} onSelect={(criDmg: number) => selectCriDmg(criDmg)} />
      <StatRow stat={stats.acc} classes="odd" selected={selectedAcc} onSelect={(acc: number) => selectAcc(acc)} />
    </div>
  );
}

export default App;
