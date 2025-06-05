import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { usePokemon, PokemonProvider } from "~/contexts/pokemon/PokemonContext";

function PokemonDetail() {
    const { pokemonName } = useParams();
    const { selectedPokemon, fetchPokemonDetails } = usePokemon();

    useEffect(() => {
        if (pokemonName) {
            fetchPokemonDetails(pokemonName);
        }
    }, [pokemonName]);

    if (!selectedPokemon) {
        return (
            <div>
                <h2>Pokémon non trouvé</h2>
                <Link to="/pokemon">← Retour</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <p><strong>Types :</strong> {selectedPokemon.types.map((t) => t.type.name).join(", ")}</p>
            <p><strong>Capacités :</strong> {selectedPokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
            <Link to="/pokemon">← Retour</Link>
        </div>
    );
}

export default function PokemonDetailWithProvider() {
    return (
        <PokemonProvider>
            <PokemonDetail />
        </PokemonProvider>
    );
}
