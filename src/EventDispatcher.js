class EventDispatcher
{
    constructor() {
        this.handlers = {};
    }

    bindHandler(name, handler)
    {
        if (!this.handlers.hasOwnProperty(name))
        {
            this.handlers[name] = [];
        }

        this.handlers[name].push(handler);
    }

    dispatch(eventName, eventData) {
        if (!this.handlers.hasOwnProperty(eventName))
        {
            return eventData;
        }

        return this.handlers[eventName].map((handler) => {
            handler(eventData);
        });
    }
}

module.exports = EventDispatcher;