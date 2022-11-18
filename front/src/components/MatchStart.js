import * as cfg from "../config";

const MonsterCard = ({ monster }) => {
    return (
        <div className="MonsterCard">
            <img src={monster.imgPath}></img>
            <div>{monster.name}</div>
        </div>
    );
};

const MatchStart = ({ global, isStarting, monsters }) => {
    const monster0 = cfg.MONSTERS[monsters[0]];
    const monster1 = cfg.MONSTERS[monsters[1]];

    if (isStarting) {
        return (
            <div className="MatchStart">
                <h3>Battle Starting</h3>
                <div className="MonstersContainer">
                    <MonsterCard monster={monster0}></MonsterCard>
                    <MonsterCard monster={monster1}></MonsterCard>
                </div>
            </div>
        );
    }

    return <div className="MatchStartRemove"></div>;
};

export { MatchStart };
