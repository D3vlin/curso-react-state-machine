import { assign, createMachine } from "xstate";

const fillCountries = {
    initial: 'loading',
    states: {
        loading: {
            on: {
                DONE: 'success',
                ERROR: 'failure'
            }
        },
        success: {},
        failure: {
            on: {
                RETRY: {
                    target: 'loading'
                }
            }
        }
    }
}

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
            },
            ...fillCountries
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