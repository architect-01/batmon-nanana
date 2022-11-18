import * as cfg from "../config";

const MatchProgress = ({ monsters, moves, move }) => {
    const currMove = moves[move.id == 0 ? move.id + 1 : move.id];

    const prevMove = currMove.id - 1 >= 0 ? moves[currMove.id - 1] : null;
    const nextMove =
        currMove.id + 1 < moves.length ? moves[currMove.id + 1] : null;

    const ActionUsed = ({ move, isCurrMove }) => {
        const className = isCurrMove ? "ActionUsed CurrMove" : "ActionUsed";

        if (move == null || move.action.monster > 1)
            return <div className={className}></div>;
        const monsterId = monsters[move.action.monster];
        const monster = cfg.MONSTERS[monsterId];
        const monsterAttackingClass =
            move.action.monster === 0 ? "Monster0_Attacks" : "Monster1_Attacks";

        return (
            <div className={className}>
                <img src={monster.imgPath}></img>
                <div className={monsterAttackingClass}>
                    {move.action.effect}
                </div>
            </div>
        );
    };
    return (
        <div className="MatchProgress">
            <ActionUsed move={prevMove} isCurrMove={false}></ActionUsed>
            <div className="CurrentMove">
                <ActionUsed move={currMove} isCurrMove={true}></ActionUsed>
            </div>
            <ActionUsed move={nextMove} isCurrMove={false}></ActionUsed>
        </div>
    );
};

export { MatchProgress };
