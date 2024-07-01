import type { I_CardsFull, T_Card, T_Currency, T_CurrencyLover, T_Date, T_Port, T_Price } from "@/types.ts";


export const getWordEnd = (count: number, words: string[]) => {
    if (count % 100 > 10 && count % 100 < 20) {
        return words[0];
    } else if (count % 10 === 1) {
        return words[1];
    } else if (count % 10 >= 2 && count % 10 <= 4) {
        return words[2];
    } else {
        return words[0];
    }
};
export const useFormatDate = (isoString: string) => {
    try {
        const date = new Date(isoString);
        date.setDate(date.getDate());
        return date.toISOString().split("T")[0];
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
    }
};
export const priceFormat = (number: number, currency: T_Currency) => {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 0,
        ...(currency && {
            style: 'currency',
            currency: currency
        })
    }).format(
        number
    )
}
export const useFormatTime = (isoString: string) => {
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date format");
        }
        return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" });
    } catch (error) {
        console.error("Error formatting time:", error);
        return "Invalid time";
    }
};

export const useFindByIcao = (icao: T_Port['icao']): T_Port | undefined | null => {
    return useStore().getPortsState.entity.find((port) => port?.icao === icao);
};

// utils/dateFormatter.js
export const formatDateFromIso = (isoDate: string) => {
    const date = new Date(isoDate);

    return date.toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    }).replace(",", ", в");
};
export const morpher = (value: number, measure: "H" | "M") => {
    const comparison: { H: string[], M: string[] } = {
        H: [
            "часов",
            "час",
            "часа",
            "часа",
            "часа",
            "часов",
            "часов",
            "часов",
            "часов",
            "часов",
        ],
        M: [
            "минут",
            "минута",
            "минуты",
            "минуты",
            "минуты",
            "минут",
            "минут",
            "минут",
            "минут",
            "минут",
        ]
    }
    return `${value} ${comparison[measure][Number(String(value).slice(-1))]}`
}
export const formatDate = (date: Date): string => {
    const months = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    return `${day} ${month}`;
};
export const getNextDateFull = (date: Date, daysPlus: number) => {
    date.setDate(date.getDate() + daysPlus);
    return date;
};
export const getTomorrowDate = () => {
    const d = (new Date())
    return getNextDateFull(d, 1).toISOString().split("T")[0];
};
export const setDate = (date: Date): T_Date => {
    return {
        date: date.toISOString().split("T")[0],
        formattedDate: formatDate(date),
        day: formatDay(date),
        full: date
    };
};
export const formatDay = (date: Date): string => {
    const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    const tomorrow = getTomorrowDate();
    return date.toISOString().split("T")[0] === tomorrow ? "завтра" : daysOfWeek[date.getDay()];
};
export function formatDuration(departureDate: string, arrivalDate: string) {
    const departure = new Date(departureDate);
    const arrival = new Date(arrivalDate);

    const diffMs = Date.parse(arrivalDate) - Date.parse(departureDate);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `ВРЕМЯ ПОЛЁТА: ${(`0${diffHours}`).slice(-2)}:${(`0${diffMinutes}`).slice(-2)} ч.`;
}

export function getLoverCurrency(currency: T_Currency | string): T_CurrencyLover {
    switch (currency) {
        case 'RUB': return 'rub'
        case 'EUR': return 'eur'
        case 'USD': return 'usd'
        default: return 'rub'
    }
}
export const formatDateToISO = (dateStr: string, timeStr: string) => {
    if (!dateStr || !timeStr) return "";
    return `${dateStr}T${timeStr}:00.000Z`;
}

export const getSimilarCardId = (card: I_CardsFull | T_Card, cardsList: T_Card[]): I_CardsFull['id'] | undefined => {
    if (!card) return;
    const isCard = cardsList.find(c => {
        const r_1 = c.routes?.[0];
        const c_1 = card.routes?.[0];
        if (!r_1 || !c_1) return false;
        return ((r_1.price.rub === c_1.price.rub)
            && (r_1.aircraft === c_1.aircraft)
        )
    })
    return isCard?.id;
}

export const formatPrice = (price: T_Price, currencyFilter: T_Currency) => {
    return priceFormat(price[getLoverCurrency(currencyFilter)], currencyFilter)
};

export const sumRoutesPrices = (routes: T_Card['routes']): T_Price => {
    return routes.reduce((acc, cur) => {
        if (cur === null) return acc;
        return {
            rub: acc.rub + cur.price.rub,
            eur: acc.eur + cur.price.eur,
            usd: acc.usd + cur.price.usd,
        }
    }, {
        rub: 0,
        eur: 0,
        usd: 0
    })
}