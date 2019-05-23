const EventDispatcher = require("./EventDispatcher");

class Unit {
    constructor(props) {
        this.hp = props.hp;
        this.damage = props.damage;
        this.eventDispatcher = new EventDispatcher();
    }

    upgrade(upgradeData)
    {
        this.eventDispatcher.bindHandler(upgradeData.eventName, upgradeData.handler);
    }

    attack(target)
    {
        let eventData = {damage: this.damage};
        this.eventDispatcher.dispatch('attack', eventData);
        target.takeDamage(eventData.damage);
    }

    takeDamage(amount)
    {
        let eventData = {amount};
        this.eventDispatcher.dispatch('takeDamage', eventData);
        this.hp -= eventData.amount;
    }
}

module.exports = Unit;