import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react'
import Menu from '@/Components/Menu';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'react-toastify';
import CustomToastContainer from '@/Components/ToastContainer';
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { PlacementCTC } from '@/types/PlacementData';

export default function PlacementCTCs() {
    const [input, setInput] = useState("");
    const { data: session } = useSession();
    const [placementCTCs, setPlacementCTCs] = useState([] as PlacementCTC[]);

    const fetchPlacementCTCs = async () => {
        const res = await fetch("/api/placements/ctcs/get")
        const resp = await res.json()
        if (!resp.error) {
            setPlacementCTCs(resp.data)
        } else {
            toast.error("Error fetching placement details")
        }
    }

    React.useEffect(() => {
        fetchPlacementCTCs()
    }, [])

    return (
        <>
            <Head>
                <title>Placement CTCs.</title>
                <meta name="description" content="Handouts app for bits hyderabad" />
                <meta name="description" content="BPHC Handouts" />
                <meta name="description" content="Handouts for you." />
                <meta
                    name="description"
                    content="handouts, bits pilani hyderabad campus"
                />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='grid place-items-center'>
                <div className='w-[70vw] place-items-center flex flex-col justify-between'>
                    <h1 className='text-5xl pt-[50px] pb-[20px] px-[35px] text-primary'>Placement CTCs.</h1>
                    <Menu />
                    {session &&
                        <>

                            <div className="flex flex-col md:flex-row w-full md:w-1/2 justify-center">
                                <input type="text" placeholder="Search..." className="input input-secondary w-full max-w-xs m-3" onChange={e => setInput(e.target.value)} />
                            </div>

                            <div className="flex-col hidden md:block md:flex-row w-1/3 justify-center">
                                <Link className="m-3 w-full" href={"/placements/ctcs/add"}>
                                    <button className="btn btn-outline w-full">
                                        Add a CTC
                                    </button>
                                </Link>
                            </div>
                            <div className="z-10 w-14 fixed bottom-5 right-0 m-4 cursor-pointer text-cyan-300 md:hidden">
                                <Link className="m-3 w-full" href={"/placements/ctcs/add"}>
                                    <PlusCircleIcon />
                                </Link>
                            </div>
                        </>
                    }
                </div>
            </div>

            {session &&
                <div className="max-w-7xl mx-auto">
                    <div className='px-2 p-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center'>
                        {
                            placementCTCs.filter((placementCTC) => placementCTC.company.toLowerCase().includes(input.toLowerCase())).map((placementCTC) => (
                                <div className="card w-72 h-96 bg-base-100 text-base-content m-2" key={placementCTC.company}>
                                    <div className="card-body">
                                        <p className='text-lg'>{placementCTC?.company.toUpperCase()}</p>

                                        <div className="flex-none">
                                            <p className="m-1">Base: {placementCTC.base}</p>
                                            <p className="m-1">Joining Bonus: {placementCTC.joining_bonus}</p>
                                            <p className="m-1">Relocation Bonus: {placementCTC.relocation_bonus}</p>
                                            <p className="m-1">Variable Bonus: {placementCTC.variable_bonus}</p>
                                            <p className="m-1">Monetary Value of Benefits: {placementCTC.monetary_value_of_benefits}</p>
                                            <p className="m-1">Desc: {placementCTC.description}</p>
                                        </div>
                                    </div>
                                </div>))
                        }
                    </div>
                </div >
            }
            <CustomToastContainer containerId="placementCTCs" />
        </>
    )
}
