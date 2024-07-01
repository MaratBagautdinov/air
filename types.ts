export interface T_Port {
    icao: string;
    iata: string;
    name: string;
    name_rus: string;
    city: string;
    city_rus: string;
    need_covid_message: boolean;
}

export type T_Currency = "RUB" | "EUR" | "USD"
export type T_CurrencyLover = "rub" | "eur" | "usd"

export interface I_CardsFull {
    routes: [RoutesEntity, RoutesEntity];
    id: string
    datetime: string
    query: I_CardsQuery
    operator: string
    script: boolean
    is_el_search: boolean
    is_large_aircraft_search: boolean
    is_shuttle_search: boolean
    datetime_local: string
}
export type T_SearchDate = {
    date: T_Date,
    time: T_TIME,
}
export type T_Date = {
    date: string,
    formattedDate: string,
    day: string,
    full: Date
}
export type T_TIME = string
export interface I_CardsQuery {
    departure_date_there: string
    pax_there: number
    departure_airport: string
    departure_date_back?: string
    arrival_airport: string
    operator: string
}
export interface I_CardsAPI {
    cards: (T_Card)[];
    id: string;
    datetime: string;
    error?: {
        code: number | null;
        text: string
    },
}
export interface T_CardError {
    cards: (T_Card)[];
    error: {
        code: number | null;
        text: string
    },
    error_id: string;
    id: string;
}
export type T_PortType = "to" | "from"
export type T_sortBy = "year" | "seats" | "priceDesc" | "priceAsc"
export interface T_Card {
    id: string;
    routes: [RoutesEntity, RoutesEntity | null];
    need_agreements: boolean;
    order_by_time: number;
    script: boolean;
}

export interface RoutesEntity {
    aircraft: string;
    aircraft_type: string;
    daylight_only?: null;
    aircraft_year_of_creation: number;
    aircraft_year_of_renewal: number;
    aircraft_year_of_overhaul: number;
    aircraft_picture_url: string;
    aircraft_picture_urls: AircraftPictureUrls;
    aircraft_class: string;
    departure_date: string;
    arrival_date: string;
    departure_date_local: string;
    arrival_date_local: string;
    departure_airport: string;
    arrival_airport: string;
    flight_id: string;
    operator: string;
    operator_logo: string;
    operator_name: string;
    operator_phone: string;
    operator_email: string;
    max_pax: number;
    price: T_Price;
    legs: (LegsEntity)[];
    start_date: string;
    end_date: string;
    crew?: ({})[] | null;
    need_agreements: boolean;
    is_discount: boolean;
    discount_url?: null;
    is_emptyleg: boolean;
    characteristics: Characteristics;
    pax: number;
    number: string;
}
export type T_STATE_ENTITY<entity> = {
    pending: boolean,
    error: {
        status: boolean,
        msg: string,
    },
    entity: entity
}
export interface AircraftPictureUrls {
    salon: string;
    avatar: string;
    seats: string;
}

export interface T_Price {
    eur: number;
    rub: number;
    usd: number;
}

export interface LegsEntity {
    departure_airport: string;
    arrival_airport: string;
    is_emptyleg: boolean;
    start_date: string;
    end_date: string;
    type: string;
    pax: string;
    id: string;
    route_yandex_map: string;
}

export interface Characteristics {
    cabin_height: string;
    cabin_length: string;
    interior_width: string;
    wing_span: string;
    fuselage_height: string;
    fuselage_length: string;
    flying_range: number;
    cruising_speed: number;
    mtom: number;
}
export interface T_FlightImages {
    salon: string
    avatar: string
    seats: string
    gallery: T_Gallery[]
}

export interface T_Gallery {
    thumb: string
    image: string
}

