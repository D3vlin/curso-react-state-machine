import { assign, createMachine } from "xstate";

const bookingMachine = createMachine({
    id: "buy plane tickes",
    initial: 'initial',
    context: {
        passengers: [],
        selectedCountry: ''
    },
    states: {
        initial: {
            entry: assign({ passengers: [], selectedCountry: '' }),
            on: {
                START: 'search'
            }
        },
        search: {
            on: {
                CONTINUE: {
                    target: 'passengers',
                    actions: assign({ selectedCountry: ({ event }) => event.selectedCountry })
                },
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
                CANCEL: 'initial',
                ADD: {
                    target: 'passengers',
                    actions: assign(({ context, event }) => ({ passengers: [...context.passengers, event.newPassengers] }))
                }
            }
        }
    }
})

export { bookingMachine }