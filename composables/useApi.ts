export const useApiUrl = (): string => {
    return useRuntimeConfig().public.apiBase;
};

export const useApiCora = (): string => {
    return useRuntimeConfig().public.apiCora;
};

export const useApiNajet = (): string => {
    return useRuntimeConfig().public.apiNajet;
};
