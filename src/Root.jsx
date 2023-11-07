import NavBar from "./components/ui/navbar";
import SummarizeForm from "./components/forms/summarize";
import { Button, Heading, Select, Separator, Tabs } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { indigo, orange } from "@radix-ui/colors";


export default function Root() {
    const [response, setResponse] = useState({ data: "", loading: false });

    const wrapperSetResponse = useCallback(val => {
        setResponse(val);
    }, [setResponse]);

    return (
        <div className="">
            <NavBar />
            <div className="grid grid-cols-12">
                <div className="col-span-3 border-r h-screen border-black items-center">
                    <div className="mx-4 my-6">
                        <div className="mb-4 flex justify-between items-end">
                            <div>
                                <Heading size={"7"}>Query</Heading>
                                <Heading color="indigo" size={1} weight="medium" >Make a simple query</Heading>
                            </div>
                            <Select.Root defaultValue="query">
                                <Select.Trigger />
                                <Select.Content position="popper">
                                    <Select.Item value="query">Query</Select.Item>
                                    <Select.Item value="summary">Summarize</Select.Item>
                                    <Select.Item value="dump">Load File</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </div>
                        <Separator size="4" />
                        <div className="mt-4">
                            <SummarizeForm callbackResponse={wrapperSetResponse} />
                        </div>
                    </div>
                </div>
                <div className="col-span-9 mx-10 my-6">
                    <div className="flex space-x-2 mb-4 items-end justify-between">
                        <div>
                            <Heading size={"7"}>Output Response</Heading>
                            <Heading color="indigo" size={1} weight="medium" >This is where your response will be output</Heading>
                        </div>
                        <div className="flex space-x-2">
                            <div>
                                <Button size="2" variant="outline">Save</Button>
                            </div>
                            <div>
                                <Button size="2" variant="outline">Copy</Button>
                            </div>
                            <div>
                                <Button size="2" variant="outline">View Response</Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-10 py-10 bg-transparent border rounded-sm border-black flex justify center content-center cursor-default w-full h-full appearance-none" >
                        {
                            response?.loading ?
                                <div className="flex ml-auto mr-auto text-center align-middle items-center content-center ">
                                    <HashLoader
                                        color={indigo.indigo9}
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
