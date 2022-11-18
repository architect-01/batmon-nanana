const MonsterState = ({ move, affectedMonster }) => {
    const monster0ClassName = `Monster0_State${
        affectedMonster == 0 ? ` Blink` : ``
    }`;
    const monster1ClassName = `Monster1_State${
        affectedMonster == 1 ? ` Blink` : ``
    }`;

    return (
        <div className="MonsterState">
            <div className={monster0ClassName}>
                <div className="health">{`Health: ${move.state.monster0.health}`}</div>
            </div>

            <div className={monster1ClassName}>
                <div className="health">{`Health: ${move.state.monster1.health}`}</div>
            </div>
        </div>
    );
};

export { MonsterState };
