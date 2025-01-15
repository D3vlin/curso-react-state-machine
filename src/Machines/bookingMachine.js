import { createMachine } from "xstate";

const bookingMachine = createMachine({
    id: "buy plane tickes",
    initial: 'initial',
    states: {
        initial: {
            on: {
                START: 'search'
            }
        },
        search: {
            on: {
                CONTINUE: 'passangers',
                CANCEL: 'initial'
            }
        },
        tickets: {
            on: {
                FINISH: 'initial'
            }
        },
        passangers: {
            on: {
                DONE: 'tickets',
                CANCEL: 'initial'
            }
        }
    }
})

export { bookingMachine }