import { useEffect } from "react";
import { usePokemon, PokemonProvider } from "~/contexts/pokemon/PokemonContext";
import { NavLink } from "react-router";

function PokemonList() {
    const { pokemons, fetchPokemons } = usePokemon();

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <div>
            <h1>Liste des Pokémons</h1>
            {pokemons.length === 0 ? (
                <p>Chargement ou aucun Pokémon trouvé.</p>
            ) : (
                <ul>
                    {pokemons.map((p) => (
                        <li key={p.name}>
                            <NavLink to={`/pokemon/${p.name}`}>{p.name}</NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function PokemonListWithProvider() {
    return (
        <PokemonProvider>
            <PokemonList />
        </PokemonProvider>
    );
}
