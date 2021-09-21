declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SUPABASE_PUBLIC_URL: string;
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
        }
    }
}

export {};