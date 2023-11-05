import NavBar from "./components/ui/navbar";
import SummarizeForm from "./components/forms/summarize";
import { Tabs } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { orange } from "@radix-ui/colors";


export default function Root() {
    const [response, setResponse] = useState({ data: "", loading: false });

    const wrapperSetResponse = useCallback(val => {
        setResponse(val);
    }, [setResponse]);

    return (
        <div className="">
            <NavBar />
            <div className="grid grid-cols-12">
                <div className="col-span-3 border-r h-screen border-black">
                    <div className="mx-4">
                        <Tabs.Root defaultValue="query" className="pb-4">
                            <Tabs.List>
                                <Tabs.Trigger value="query">Query</Tabs.Trigger>
                                <Tabs.Trigger value="summarize">Summarize</Tabs.Trigger>
                                <Tabs.Trigger value="dump">Data Dump</Tabs.Trigger>
                            </Tabs.List>
                            <Tabs.Content value="query">
                                <SummarizeForm callbackResponse={wrapperSetResponse} />
                            </Tabs.Content>
                        </Tabs.Root>
                    </div>
                </div>
                <div className="col-span-9 mx-10 my-10 flex justify-center">
                    <div className="px-10 py-10 bg-transparent border rounded-sm border-black flex justify center content-center cursor-default w-full h-full appearance-none" >
                        {console.log(response)}
                        {
                            response?.loading ?
                                <div className="flex ml-auto mr-auto text-center align-middle items-center content-center ">
                                    <HashLoader
                                        color={orange.orange9}
                                        loading={response.loading}
                                        size={40}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div> :
                                <div className="whitespace-pre-line">
                                    {response.data}
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
