import Layout from '../components/Layout'
import Link from 'next/link'
import { useState } from "react";
import Img from 'next/image';

export default function Home(props) {
    const {pokemon} = props;
    const [searchValue, setSearchValue] = useState('')
    const filteredPokemon = pokemon.filter((data) => {
        return data.name.search(searchValue) != -1;
        });
    const displayPokemon =
    pokemon.length > 0 && !searchValue ? pokemon : filteredPokemon

  return (
    <Layout title="NextJS PokeDex">
        <h1 className="text-4xl mb-8 text-center ">Pokedex</h1>
        <div className="p-8">
            <div className="bg-white flex items-center rounded-full shadow-xl">
                <input  onChange={(e) => setSearchValue(e.target.value)} className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search"></input>
                <div className="p-4">
               
                </div>
            </div>
        </div>
            <ul>
            {!filteredPokemon.length && 'No posts found.'}
            {displayPokemon?.map((item, index) => (
                    <li key={index}>
                        <Link href={`/pokemon/${index + 1}`}>
                            <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md sm:mx-4">
                                <Img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 mr-3"
                                    width={100}
                                    height={100}
                                />
                                <span className="mr-2 font-bold">
                                    {index + 1}.
                                </span>
                                {item.name}
                            </a>
                        </Link>
                    </li>
                ))}  

            </ul>
    </Layout>
  )
}

export const getStaticProps = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const { results }  = await res.json();
    const pokemon = results.map((pokeman, index) => {
        const paddedId = ('00' + (index + 1)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return { ...pokeman, image };
    });
    return {
        props: { pokemon },
    };

}