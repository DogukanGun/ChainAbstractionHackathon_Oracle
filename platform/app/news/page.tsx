"use client"

import { useState } from "react";
import { useConnect } from '@particle-network/authkit';

const News = () => {

    const [topic, setTopic] = useState("")
    const { connect, disconnect, connected } = useConnect();

    const search = async() => {
        if (!connected) {
            await connect({});
        }
        //TODO: Get score
    }

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Search News</h2>
                <div className="mx-auto max-w-lg rounded-lg border">
                    <div className="flex flex-col gap-4 p-4 md:p-8">
                        <div>
                            <label htmlFor="topic" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Topic</label>
                            <input value={topic} onChange={(event) => setTopic(event.target.value)} name="topic" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <button onClick={search} className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default News;