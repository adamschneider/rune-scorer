import { useState } from 'react';

import './App.css';
import { useNavigate } from 'react-router-dom';

class Stat {
    constructor(
        public name: string,
        public range_minimum: number,
        public range_maximum: number,
        public maximum: number,
        public weight: number,
    ) { }
}

const Stats = {
    hp: new Stat("HP %", 5, 8, 50, 1),
    atk: new Stat("ATK %", 5, 8, 50, 1),
    def: new Stat("DEF  %", 5, 8, 50, 1),
    spd: new Stat("SPD", 4, 6, 35, 2),
    criRate: new Stat("CRI Rate %", 4, 6, 30, 1.5),
    criDmg: new Stat("CRI Dmg %", 4, 7, 35, 1),
    acc: new Stat("Acc %", 4, 8, 40, 1)
};

function ButtonRow({ stat, value, onChange, classes }: { stat: Stat, value: number, onChange: (value: number) => void, classes: string }) {

    let button = function (v: number) {
        let selected = value == v ? "selected" : "";
        return <span className={`btn ${selected}`} onClick={() => onChange(v)}>{v}</span>;
    }

    let buttons = [button(0)];

    for (let i = stat.range_minimum; i <= stat.maximum; i++) {
        buttons.push(button(i))
    }

    return (
        <div className={`button row stat-row ${classes}`}>
            <span className="label">{stat.name}</span>
            {buttons}
        </div>
    )
}

function SliderRow({ stat, value, onChange, classes }: { stat: Stat, value: number, onChange: (value: number) => void, classes: string }) {
    return (
        <div className={`slider row stat-row ${classes}`}>
            <span className="label">{stat.name}</span>
            <span className="value">{value}</span>
            <input className="slider" type="range" min={0} max={stat.maximum} value={value} onChange={(e) => onChange(Number(e.target.value))} />
        </div>
    )
}

export default function App({ mode }: { mode: string }) {

    const [selectedHp, selectHp] = useState(0);
    const [selectedAtk, selectAtk] = useState(0);
    const [selectedDef, selectDef] = useState(0);
    const [selectedSpd, selectSpd] = useState(0);
    const [selectedCriRate, selectCriRate] = useState(0);
    const [selectedCriDmg, selectCriDmg] = useState(0);
    const [selectedAcc, selectAcc] = useState(0);

    const score = Math.ceil(
        selectedHp * Stats.hp.weight +
        selectedAtk * Stats.atk.weight +
        selectedDef * Stats.def.weight +
        selectedSpd * Stats.spd.weight +
        selectedCriRate * Stats.criRate.weight +
        selectedCriDmg * Stats.criDmg.weight +
        selectedAcc * Stats.acc.weight
    );

    const reset = () => {
        selectHp(0);
        selectAtk(0);
        selectDef(0);
        selectSpd(0);
        selectCriRate(0);
        selectCriDmg(0);
        selectAcc(0);
    }

    let buttons = <>
        <ButtonRow stat={Stats.hp} classes="odd" value={selectedHp} onChange={(hp: number) => selectHp(hp)} />
        <ButtonRow stat={Stats.atk} classes="even" value={selectedAtk} onChange={(atk: number) => selectAtk(atk)} />
        <ButtonRow stat={Stats.def} classes="odd" value={selectedDef} onChange={(def: number) => selectDef(def)} />
        <ButtonRow stat={Stats.spd} classes="even" value={selectedSpd} onChange={(spd: number) => selectSpd(spd)} />
        <ButtonRow stat={Stats.criRate} classes="odd" value={selectedCriRate} onChange={(criRate: number) => selectCriRate(criRate)} />
        <ButtonRow stat={Stats.criDmg} classes="even" value={selectedCriDmg} onChange={(criDmg: number) => selectCriDmg(criDmg)} />
        <ButtonRow stat={Stats.acc} classes="odd" value={selectedAcc} onChange={(acc: number) => selectAcc(acc)} />
    </>;

    let sliders = <>
        <SliderRow stat={Stats.hp} classes="odd" value={selectedHp} onChange={(hp: number) => selectHp(hp)} />
        <SliderRow stat={Stats.atk} classes="even" value={selectedAtk} onChange={(atk: number) => selectAtk(atk)} />
        <SliderRow stat={Stats.def} classes="odd" value={selectedDef} onChange={(def: number) => selectDef(def)} />
        <SliderRow stat={Stats.spd} classes="even" value={selectedSpd} onChange={(spd: number) => selectSpd(spd)} />
        <SliderRow stat={Stats.criRate} classes="odd" value={selectedCriRate} onChange={(criRate: number) => selectCriRate(criRate)} />
        <SliderRow stat={Stats.criDmg} classes="even" value={selectedCriDmg} onChange={(criDmg: number) => selectCriDmg(criDmg)} />
        <SliderRow stat={Stats.acc} classes="odd" value={selectedAcc} onChange={(acc: number) => selectAcc(acc)} />
    </>;

    const navigate = useNavigate();

    return (
        <div className="main">
            <div className="menu">
                <span className={"btn " + (mode == "sliders" ? "selected" : "")} onClick={() => navigate("/sliders")}>Sliders</span>
                <span className={"btn " + (mode == "buttons" ? "selected" : "")} onClick={() => navigate("/buttons")}>Buttons</span>
            </div>

            <div className="scorer">
                <div className="score-row">
                    <span>Score</span><span className="score">{score}</span><span className="btn" onClick={reset}>Reset</span>
                </div>

                {mode == "buttons" ? buttons : sliders}
            </div>
        </div >
    )

}