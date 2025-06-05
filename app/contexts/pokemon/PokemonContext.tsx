import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
}

interface PokemonContextType {
    pokemons: PokemonListItem[];
    selectedPokemon: PokemonDetails | null;
    fetchPokemons: () => Promise<void>;
    fetchPokemonDetails: (name: string) => Promise<void>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export function usePokemon() {
    const context = useContext(PokemonContext);
    if (!context) throw new Error("usePokemon doit être utilisé dans PokemonProvider");
    return context;
}

export function PokemonProvider({ children }: { children: ReactNode }) {
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

    const fetchPokemons = async () => {
        try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
            const data = await res.json();
            setPokemons(data.results);
        } catch (error) {
            console.error("Impossible de récupérer le pokémon", error);
        }
    };

    const fetchPokemonDetails = async (name: string) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!res.ok) {
                setSelectedPokemon(null);
                return;
            }
            const data = await res.json();
            setSelectedPokemon(data);
        } catch (error) {
            console.error("Impossible de récupérer les détails du pokémon", error);
            setSelectedPokemon(null);
        }
    };

    return (
        <PokemonContext.Provider value={{ pokemons, selectedPokemon, fetchPokemons, fetchPokemonDetails }}>
            {children}
        </PokemonContext.Provider>
    );
}
