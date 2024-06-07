import { useState } from 'react';
import './App.css';

class Stat {
  constructor(
    public name: string,
    public minimum: number,
    public maximum: number,
    public weight: number,
    public main: number,
  ) { }
}

function StatRow({ stat, value, onChange, classes }: { stat: Stat, value: number, onChange: (value: number) => void, classes: string }) {
  return (
    <div className={`row stat-row ${classes}`}>
      <span className="label">{stat.name}</span>
      <input className="slider" type="range" min={stat.minimum} max={stat.maximum} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}

const stats = {
  hp: new Stat("HP %", 0, 50, 1, 63),
  atk: new Stat("ATK %", 0, 50, 1, 63),
  def: new Stat("DEF  %", 0, 50, 1, 63),
  spd: new Stat("SPD", 0, 35, 2, 42),
  criRate: new Stat("CRI Rate %", 0, 30, 1.5, 58),
  criDmg: new Stat("CRI Dmg %", 0, 35, 1, 80),
  acc: new Stat("Acc %", 0, 40, 1, 64)
};

function App() {
  const [selectedHp, selectHp] = useState(0);
  const [selectedAtk, selectAtk] = useState(0);
  const [selectedDef, selectDef] = useState(0);
  const [selectedSpd, selectSpd] = useState(0);
  const [selectedCriRate, selectCriRate] = useState(0);
  const [selectedCriDmg, selectCriDmg] = useState(0);
  const [selectedAcc, selectAcc] = useState(0);

  const score = Math.ceil(
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

      <StatRow stat={stats.hp} classes="odd" value={selectedHp} onChange={(hp: number) => selectHp(hp)} />
      <StatRow stat={stats.atk} classes="even" value={selectedAtk} onChange={(atk: number) => selectAtk(atk)} />
      <StatRow stat={stats.def} classes="odd" value={selectedDef} onChange={(def: number) => selectDef(def)} />
      <StatRow stat={stats.spd} classes="even" value={selectedSpd} onChange={(spd: number) => selectSpd(spd)} />
      <StatRow stat={stats.criRate} classes="odd" value={selectedCriRate} onChange={(criRate: number) => selectCriRate(criRate)} />
      <StatRow stat={stats.criDmg} classes="even" value={selectedCriDmg} onChange={(criDmg: number) => selectCriDmg(criDmg)} />
      <StatRow stat={stats.acc} classes="odd" value={selectedAcc} onChange={(acc: number) => selectAcc(acc)} />
    </div>
  );
}

export default App;
