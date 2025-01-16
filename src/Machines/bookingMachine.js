import { assign, createMachine, fromPromise } from "xstate";
import { fetchCountries } from "../Utils/api"

const fillCountries = {
    initial: 'loading',
    states: {
        loading: {
            invoke: {
                id: 'getCountries',
                src: fromPromise(() => fetchCountries()),
                onDone: {
                    target: 'success',
                    actions: assign({ countries: ({ event }) => event.output })
                },
                onerror: {
                    target: 'failure',
                    actions: assign({ error: 'Fallo el request' })
                }
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

const bookingMachine = createMachine(
    {
        id: "buy plane tickes",
        initial: 'initial',
        context: {
            passengers: [],
            selectedCountry: '',
            countries: [],
            error: ''
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
                after: {
                    3000: {
                        target: 'initial'
                    }
                },
                on: {
                    FINISH: 'initial'
                }
            },
            passengers: {
                on: {
                    DONE: {
                        target: 'tickets',
                        guard: 'moreThanOnePassenger'
                    },
                    CANCEL: 'initial',
                    ADD: {
                        target: 'passengers',
                        actions: assign(({ context, event }) => ({ passengers: [...context.passengers, event.newPassengers] }))
                    }
                }
            }
        }
    },
    {
        guards: {
            moreThanOnePassenger: ({context}) => (context.passengers.length > 0)
        }
    }
)

export { bookingMachine }