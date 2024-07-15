import { defineStore } from "pinia";
import type { T_Date, T_Card, T_Currency, T_Port, T_PortType, T_SearchDate, I_CardsAPI, T_sortBy, T_STATE_ENTITY } from "~/types";
import { formatDateToISO, getNextDateFull } from "~/utils";



interface I_STATE {
    getPortsState: T_STATE_ENTITY<[T_Port | null, T_Port | null]>,
    fromPort: T_Port | null,
    toPort: T_Port | null,
    datePort: T_SearchDate,
    dateBack: T_SearchDate,
    passengerCount: number,
    isBackLine: boolean,
    listCards: T_Card[],
    listCardsFilterd: T_Card[],
    currencyFilter: T_Currency,
    sortBy: T_sortBy,
    aircraftTypeFilter: string,
    errorText: string
    needSearch: boolean,
    isFilterOpened: boolean,
}

export const useStore = defineStore("searchFly", {
    state: (): I_STATE => ({
        fromPort: null,
        toPort: null,
        datePort: {
            date: setDate(getNextDateFull(new Date(), 1)),
            time: "12:00",
        },
        dateBack: {
            date: setDate(getNextDateFull(new Date(), 2)),
            time: "12:00",
        },
        getPortsState: {
            pending: true,
            error: {
                status: false,
                msg: "",
            },
            entity: [null, null],
        },
        passengerCount: 1,
        isBackLine: false,
        listCards: [],
        listCardsFilterd: [],
        currencyFilter: "RUB",
        sortBy: "priceAsc",
        aircraftTypeFilter: "",
        errorText: "",
        needSearch: false,
        isFilterOpened: false,
    }),
    getters: {},
    actions: {
        setListCardsFilterd() {
            const sortFunctions = {
                priceAsc: (a: T_Card, b: T_Card) => a.routes[0].price.rub - b.routes[0].price.rub,
                priceDesc: (a: T_Card, b: T_Card) => b.routes[0].price.rub - a.routes[0].price.rub,
                seats: (a: T_Card, b: T_Card) => b.routes[0].max_pax - a.routes[0].max_pax,
                year: (a: T_Card, b: T_Card) => b.routes[0].aircraft_year_of_creation - a.routes[0].aircraft_year_of_creation,
            };
            const filteredFlights = (list: T_Card[], aircraftTypeFilter: string) => {
                if (aircraftTypeFilter === '') return list;
                return list.filter((card) => {
                    return card.routes?.[0]?.aircraft_class === aircraftTypeFilter;
                });
            };
            this.listCardsFilterd = filteredFlights([...this.listCards].sort(sortFunctions[this.sortBy]), this.aircraftTypeFilter);
        },
        setListCards(list: T_Card[]) {
            this.listCards = list
            this.setListCardsFilterd()
        },
        setDatePort(date: T_Date) {
            if (this.dateBack) {
                const to = (new Date(date.date))
                const from = (new Date(this.dateBack.date.date))
                if (to > from) {
                    this.dateBack.date = setDate(getNextDateFull(to, 1))
                }
            }
            this.datePort.date = date
        },
        setDateBack(date: T_Date) {
            const from = (new Date(date.date))
            const to = (new Date(this.datePort.date.date))
            if (to > from) {

                this.datePort.date = setDate(getNextDateFull(from, from > getNextDateFull(new Date(), 1) ? -1 : 0))
            }
            this.dateBack = { date, time: "12:00" }
        },
        setCurrency(newCurrency: string | T_Currency) {
            let c: T_Currency = 'RUB'
            switch (newCurrency) {
                case 'RUB': c = 'RUB'; break;
                case 'EUR': c = 'EUR'; break;
                case 'USD': c = 'USD'; break;
            }
            this.currencyFilter = c
            localStorage.setItem('currency', this.currencyFilter)
        },
        selectPort(type: T_PortType, port: T_Port) {
            if (type === "from") {
                this.fromPort = port;
            } else if (type === "to") {
                this.toPort = port;
            }
        },
        async getPorts() {
            this.getPortsState.error.status = false;
            this.getPortsState.pending = true;
            try {
                const cachedPorts = localStorage.getItem("ports");
                if (cachedPorts) {
                    this.getPortsState.entity = JSON.parse(cachedPorts);
                } else {
                    const res = await $fetch<[T_Port, T_Port]>(useApiUrl() + "airports-names");
                    if (res) {
                        this.getPortsState.entity = res;
                        localStorage.setItem("ports", JSON.stringify(res));
                    }
                }
            } catch (e) {
                console.error(e);
                this.getPortsState.error.status = true;
                this.getPortsState.error.msg = String(e);
            } finally {
                this.getPortsState.pending = false;
            }
        },


        async sendPorts(): Promise<I_CardsAPI> {
            this.getPortsState.pending = true;
            this.getPortsState.error.status = false;
            this.getPortsState.error.msg = '';

            const formattedDate = formatDateToISO(this.datePort.date.date, this.datePort.time);
            const formattedDateBack = this.dateBack ? formatDateToISO(this.dateBack.date.date, this.dateBack.time) : '';
            try {
                if (!this.fromPort || !this.toPort) { return Promise.reject("Не выбраны порты") }
                const res = await $fetch<I_CardsAPI>(useApiCora() + "cards", {
                    method: "GET",
                    query: {
                        departure_date_there: formattedDate,
                        pax_there: this.passengerCount,
                        departure_airport: this.fromPort?.icao,
                        arrival_airport: this.toPort?.icao,
                        operator: "weltall",
                        ...(this.isBackLine && formattedDateBack && { departure_date_back: formattedDateBack }),
                        ...(this.isBackLine && formattedDateBack && { pax_back: this.passengerCount }),
                    },
                });
                console.log(res.error, !!res.error);

                if (res.error) {
                    this.getPortsState.error.status = true;
                    this.getPortsState.error.msg = res.error.text;
                    return res;
                }
                if (this.passengerCount > 8 && res.cards.length === 0) {
                    this.getPortsState.error.status = true;
                    this.getPortsState.error.msg = 'К сожалению, флот авиакомпании не имеет самолетов с требуемым количеством пассажирских мест. Вы можете обратиться к нам по адресу charter@weltall.ru или по телефону +7 (495) 129 29 04  и мы подберем Вам необходимый вариант.';
                }
                return res;
            } catch (error) {
                console.error(error);
                this.getPortsState.error.status = true;
                this.getPortsState.error.msg = String(error);
            } finally {
                this.getPortsState.pending = false;
            }
            return {
                cards: [],
                datetime: '',
                id: ''
            }
        },
    },
});
