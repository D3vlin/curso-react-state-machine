import { createMachine } from "xstate";

const bookingMachine = createMachine({
    id: "buy plane tickes",
    initial: 'initial',
    states: {
        initial: {
            on: {
                START: {
                    target: 'search',
                    actions: 'printAction'
                }
            }
        },
        search: {
            entry: 'printEntry',
            exit: 'printExit',
            on: {
                CONTINUE: 'passengers',
                CANCEL: 'initial'
            }
        },
        tickets: {
            on: {
                FINISH: 'initial'
            }
        },
        passengers: {
            on: {
                DONE: 'tickets',
                CANCEL: 'initial'
            }
        }
    }
},
{
    actions: {
        printAction: () => console.log('Print'),
        printEntry: () => console.log('Entry'),
        printExit: () => console.log('Exit')
    }
})

export { bookingMachine }