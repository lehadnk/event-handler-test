const Unit = require("./src/Unit");
const EventDispatcher = require("./src/EventDispatcher");

test('Unit creation', () => {
    let unit = new Unit({hp: 100, damage: 20});
    expect(unit.hp).toBe(100);
    expect(unit.damage).toBe(20);
});

test('Unit attacks another unit', () => {
    let units = [
        new Unit({hp: 100, damage: 20}),
        new Unit({hp: 100, damage: 20}),
    ];
    units[0].attack(units[1]);
    expect(units[1].hp).toBe(80);
});

test('Test event dispatcher with no handler', () => {
    let eventDispatcher = new EventDispatcher();
    let eventData = {mod: 5};
    eventDispatcher.dispatch('multiply', eventData);
    expect(eventData.mod).toBe(5);
});

test('Test event dispatcher with one handler', () => {
    let eventDispatcher = new EventDispatcher();
    let eventData = {mod: 5};
    let eventHandler = (eventData) => {
        eventData.mod *= 2;
        return eventData;
    };
    eventDispatcher.bindHandler('multiply', eventHandler);
    eventDispatcher.dispatch('multiply', eventData);
    expect(eventData.mod).toBe(10);
});

test('Test adding upgrade', () => {
    let units = [
        new Unit({hp: 100, damage: 20}),
        new Unit({hp: 100, damage: 20}),
    ];

    units[0].upgrade({
        eventName: 'attack',
        handler: function(eventData) {
            eventData.damage += 10;
        }
    });

    units[0].attack(units[1]);

    expect(units[1].hp).toBe(70);
});

test('Testing multiple upgrades', () => {
    let units = [
        new Unit({hp: 100, damage: 20}),
        new Unit({hp: 100, damage: 20}),
    ];

    // Increases damage by 15
    units[0].upgrade({
        eventName: 'attack',
        handler(eventData) {
            eventData.damage += 10;
        }
    });
    // Increases damage by 100%
    units[0].upgrade({
        eventName: 'attack',
        handler(eventData) {
            eventData.damage *= 2;
        }
    });

    // Decreases incoming damage by 15
    units[1].upgrade({
        eventName: 'takeDamage',
        handler(eventData) {
            eventData.amount -= 15;
        }
    });

    units[0].attack(units[1]);

    // We're expecting 100 - ((20 + 10) * 2 - 15) = 55
    expect(units[1].hp).toBe(55);
});