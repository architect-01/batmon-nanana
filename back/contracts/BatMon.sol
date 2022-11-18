//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./interfaces/IProgressNFT.sol"; 

import "./VRFv2Consumer.sol";

contract BatMon is VRFv2Consumer {

    uint constant public UNUSED_SKILL = 0xfff;
    uint constant public N_MAX_MOVES = 50;
    uint constant public N_MONSTER_SKEW = 2;
    uint constant public STAMINA_REGENERATION_RATE = 10;

    address public progressNFT;

    struct Skill {
        string name;
        uint damage;
        uint staminaRequirement;
    }

    struct Monster {
        string name;
        uint health;
        uint speed;
        uint stamina;
        uint [5] skillsIds;
        uint skillCount;
    }

    struct MonsterState {
        uint health;
        uint speed;
        uint stamina;
    }

    struct Move {
        bool isFinal;
        uint step;
        uint turn;
        uint skillId;
        MonsterState monster0;
        MonsterState monster1;
    }

    struct Match {
        uint progressNFT_Id;
        uint monster0_Id;
        uint[3][5] monster0_sequences;
        uint monster1_Id;
        uint[3][5] monster1_sequences;
    }

    uint public monsterCount;
    uint public skillCount;
    uint public matchCounter;
    mapping (uint => Skill) public skills;
    mapping (uint => Monster) public monsters;
    mapping (uint => Match) public matches;
    mapping (uint => uint[5]) public monsterIdToSkillIds;
    mapping (uint => uint) public monsterIdToSkillCount;

    mapping (uint => mapping( uint => uint[])) public matchIdToMonster1Sequences;

    
    mapping (uint => uint) public matchIdToRandomnessRequestId;
    mapping (uint => uint) public randomnessRequestIdToRNG;

    constructor() VRFv2Consumer(2626) {

        addSkill("fire", 2, 10);
        addSkill("laser", 5, 8);
        addSkill("thunder", 8, 3);

        uint[5] memory skillIds = [uint(0), 1, 2, UNUSED_SKILL, UNUSED_SKILL];
        addMonster("Protezar", 200, 30, 10, skillIds);
        skillIds[2] = UNUSED_SKILL;
        addMonster("Raret", 220, 40, 20, skillIds);
        skillIds[1] = UNUSED_SKILL;
        addMonster("Trapnear", 150, 20, 10, skillIds);
        skillIds[0] = 0;
        skillIds[1] = 2;
        skillIds[2] = UNUSED_SKILL;
        addMonster("Unurak", 180, 30, 1, skillIds);
        skillIds[0] = 2;
        skillIds[1] = 1;
        skillIds[2] = UNUSED_SKILL;
        addMonster("Warwear", 250, 40, 3, skillIds);
        skillIds[0] = 2;    
        skillIds[1] = UNUSED_SKILL;
        addMonster("Wizket", 450, 20, 5, skillIds);
    }
    function register () public  {

        IProgressNFT(progressNFT).mint(msg.sender);
         
    }

    function battle (uint _progressNFT_Id, uint _monsterId, uint[3][5] memory _sequences) public returns (uint matchId){

        require(IProgressNFT(progressNFT).ownerOf(_progressNFT_Id) == msg.sender, "Only token owner can call this method!!!");

        uint monster0_Id = IProgressNFT(progressNFT).tokenIdToLevel(_progressNFT_Id) + N_MONSTER_SKEW;

        require(monster0_Id < monsterCount, "That level has not yet been created !!!");

        require(_monsterId < monsterCount && _monsterId <= monster0_Id, "You cannot use that monster !!! ");

        require(_monsterHasAllTheSkillsProvided(_monsterId, _sequences), "Monster cannot use one of the skills provided!!!");

        uint [3][5] memory monster0_sequences; // currently not used - later versions will have complex patterns

        matchId = matchCounter;

        matches[matchId] = Match({  progressNFT_Id: _progressNFT_Id,
                                    monster0_Id: monster0_Id, 
                                    monster0_sequences: monster0_sequences, 
                                    monster1_Id: _monsterId,
                                    monster1_sequences: _sequences
                                });


        for(uint i = 0; i < 3; ++i){
            matchIdToMonster1Sequences[matchId][i] = new uint[](0);
            for(uint j = 0; j < 5; ++j){
                matchIdToMonster1Sequences[matchId][i].push(_sequences[j][i]);
            }
        }

        
        matchIdToRandomnessRequestId[matchId] = requestRandomWords();

        matchCounter += 1;
    }

    function _monsterHasAllTheSkillsProvided (uint monsterId, uint [3][5] memory _sequences) internal view returns (bool hasIt) {
        uint skillId;
        for(uint i = 0; i < _sequences.length; i++){
            for(uint j = 0; j < _sequences[0].length; j++){
                skillId = _sequences[i][j];
                hasIt = skillId == UNUSED_SKILL;
                for(uint x = 0; x < monsters[monsterId].skillCount; ++x){
                    hasIt = hasIt || (monsters[monsterId].skillsIds[x] == skillId);
                }
                if(hasIt == false){
                    return false;
                }
            }
        }
        return true;
    }

    function _advance (uint _progressNFT_Id) internal {

        IProgressNFT(progressNFT).levelUp(_progressNFT_Id);

    }

    function viewPlayOut (uint matchId) public view returns (
        bool randomnessFullfiled, 
        bool canClaim, 
        //Match Info
        // uint progressNFT_Id,
        // uint monster0_Id,
        // uint[3][5] memory monster0_sequences,
        // uint monster1_Id,
        // uint[3][5] memory monster1_sequences,
        uint RNG,
        //Moves
        bool[100] memory isFinal,
        // uint[100] memory t[1],
        uint[100] memory turn,
        uint[100] memory skillId,
        uint[] memory monster0_health,
        uint[] memory monster1_health
    ){

        require(s_requests[matchIdToRandomnessRequestId[matchId]].exists, "Match not created");
        require(s_requests[matchIdToRandomnessRequestId[matchId]].fulfilled, "Match randomness not fullfiled");
        RNG = s_requests[matchIdToRandomnessRequestId[matchId]].randomWords[0];
        randomnessFullfiled = RNG != 0;

        uint currentSeqId = 5 | (monsters[matches[matchId].monster0_Id].skillCount-1) << 10;
        uint currentSeqElementId = 5 ;

        monster0_health = new uint[](100);
        monster1_health = new uint[](100);
        monster0_health[0] = monsters[matches[matchId].monster0_Id].health;
        monster1_health[0] = monsters[matches[matchId].monster1_Id].health;

        uint[3] memory t; t[0]= 0; t[2] = monsterIdToSkillCount[matches[matchId].monster0_Id]; //uint t[0]; uint t[1]; uint x;
        for(t[1] = 1; t[1] < N_MAX_MOVES; ++t[1]){
            // choosing who's turn it is
            turn[t[1]] = (RNG >> t[1]) & 1;

            // choosing skill id that is being used (regardless of the monster who's turn it is)
            if(turn[t[1]] == 0){ // turn for monster 0
                skillId[t[1]] = (RNG >> (t[1]+1)) % t[2];

            } else { // turn for monster1

                skillId[t[1]] =  matchIdToMonster1Sequences[matchId][0][0];

                if(currentSeqElementId == 5){
                    currentSeqId = ((RNG >> (t[1]+2)) % 3);

                    currentSeqElementId = 0;

                    skillId[t[1]] = matchIdToMonster1Sequences[matchId][currentSeqId][0];
                } else {
                    currentSeqElementId += 1;
                    if(currentSeqElementId >=  matchIdToMonster1Sequences[matchId][currentSeqId].length 
                        || matchIdToMonster1Sequences[matchId][currentSeqId][currentSeqElementId] == UNUSED_SKILL){

                        currentSeqId = ((RNG >> (t[1]+2)) % 3);
                        currentSeqElementId = 0;

                        skillId[t[1]] = matchIdToMonster1Sequences[matchId][currentSeqId][0];
                    } else{

                        skillId[t[1]] = matchIdToMonster1Sequences[matchId][currentSeqId][currentSeqElementId];
                    }
                }
                
            }

            // applying the choosen skill
            uint damage = skills[skillId[t[1]]].damage;
            monster0_health[t[1]] = monster0_health[t[1]-1];
            monster1_health[t[1]] = monster1_health[t[1]-1];

            if(turn[t[1]] == 0) {

                if(monster1_health[t[1]] <= damage){
                    t[0] = 1;
                    monster1_health[t[1]] = 0;
                }else{
                    monster1_health[t[1]] -= damage;
                }

            } else {

                if(monster0_health[t[1]] <= damage){
                    t[0] = 1;
                    monster0_health[t[1]] = 0;
                }else{
                    monster0_health[t[1]] -= damage;
                }
            }

            if(t[0] == 1){
                isFinal[t[1]] = true;
                break;
            }

        }

        if(t[1] >= N_MAX_MOVES){
            isFinal[N_MAX_MOVES-1] = true;
            t[1] = N_MAX_MOVES-1;
        }

        canClaim = monster0_health[t[1]] < monster1_health[t[1]];

    }

    function claim (uint _matchId) public returns (bool){
        uint progressNFT_Id = matches[_matchId].progressNFT_Id;
        require(IProgressNFT(progressNFT).ownerOf(progressNFT_Id) == msg.sender, "Only token owner can call this method!!!");
        (, bool canClaim, , , , , ,) = viewPlayOut(_matchId);
        require(canClaim, "You cannot claim this monster");
        IProgressNFT(progressNFT).levelUp(progressNFT_Id);
        return true;
    }

    /* admin logic------------------------------------------------------------------------------------- */


    function setProgressNFT (address _progressNFT) public onlyOwner {
        progressNFT = _progressNFT;
    }

    function addMonster (string memory _name, uint _health, uint _speed, uint _stamina, uint[5] memory _skillsIds) public onlyOwner {

        //creates new monsters on upcoming levels ...

        uint skillsUsedCount = 0;
        for(uint i = 0; i < _skillsIds.length; ++i){
            require(_skillsIds[i] < skillCount || _skillsIds[i] == UNUSED_SKILL, "Skill has either not been created or is not used");
            skillsUsedCount += _skillsIds[i] != UNUSED_SKILL ? 1 : 0;
        }

        require(skillsUsedCount > 0, "Monster must use at least one skill");

        Monster memory m = Monster({name: _name, health: _health, speed: _speed, stamina: _stamina, skillsIds: _skillsIds, skillCount: skillsUsedCount});

        monsters[monsterCount] = m;
        monsterIdToSkillIds[monsterCount] = m.skillsIds;
        monsterIdToSkillCount[monsterCount] = skillsUsedCount;
        monsterCount++;

    }


    function addSkill (string memory _name, uint _damage, uint _staminaRequirement) public onlyOwner {

        //creates skills for new monsters

        skills[skillCount] = Skill({name: _name, damage: _damage, staminaRequirement: _staminaRequirement});
        skillCount++;

    }


    /* -------------------------------------------------------------------------------------admin logic */

}