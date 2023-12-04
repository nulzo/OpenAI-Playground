import NavBar from "./components/ui/navbar";
import SummarizeForm from "./components/forms/summarize";
import { Avatar, Box, Button, Card, Heading, Select, Separator, Tabs } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { indigo, orange, cyan } from "@radix-ui/colors";
import { IconRobot } from "@tabler/icons-react";
import { PulseLoader } from "react-spinners";
import { HeartIcon } from "lucide-react";
import LoadForm from "./components/forms/load";


export default function Root() {
    const [response, setResponse] = useState({ data: "", loading: false });
    const [currentTab, setCurrentTab] = useState("query");

    const wrapperSetResponse = useCallback(val => {
        setResponse(val);
    }, [setResponse]);

    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-12">
                <div className="col-span-3 border-r h-[96vh] items-center bg-secondary/25">
                    <div className="mx-4 my-6">
                        <div className="mb-4 flex justify-between items-end">
                            <div>
                                <Heading size={"7"}>Query</Heading>
                                <Heading color="secondary" size={1} weight="medium" >Make a simple query</Heading>
                            </div>
                            <Select.Root defaultValue="query" onValueChange={(e) => setCurrentTab(e)}>
                                <Select.Trigger />
                                <Select.Content position="popper">
                                    <Select.Item value="query">Query</Select.Item>
                                    <Select.Item value="load">Load File</Select.Item>
                                    <Select.Item value="saved">Saved</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </div>
                        <Separator size="4" />
                        {currentTab === 'query' &&
                            <div className="mt-4">
                                <SummarizeForm callbackResponse={wrapperSetResponse} />
                            </div>
                        }
                        {currentTab === 'load' &&
                            <div className="mt-4">
                                <LoadForm callbackResponse={wrapperSetResponse} />
                            </div>
                        }
                    </div>
                </div>
                <div className="col-span-9 mx-10 my-6">
                    <div className="flex space-x-2 mb-4 items-end justify-between">
                        <div>
                            <Heading size={"7"}>Output Response</Heading>
                            <Heading color="secondary" size={1} weight="medium" >This is where your response will be output</Heading>
                        </div>
                    </div>
                    <Separator size="4" />
                    <div className="px-2 pt-10 bg-transparent rounded-sm flex justify center content-center cursor-default w-full appearance-none" >
                        <div className="whitespace-pre-line w-full">
                            <div className="font-bold">
                                <Avatar radius="large" fallback={
                                    <Box width="5" height="5">
                                        <IconRobot />
                                    </Box>
                                }>
                                </Avatar>
                                <span className="px-2">
                                    Scrum
                                </span>
                            </div>
                            <Card className="my-2 w-full min-h-[3em]">
                                {
                                    response?.loading ?
                                        <div className="flex w-full ml-auto mr-auto text-center align-middle items-center content-center ">
                                            <PulseLoader
                                                color={cyan.cyan9}
                                                loading={response.loading}
                                                size={8}
                                                speedMultiplier={0.75}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div> :
                                        <div>
                                            {!!response.data && response.data}
                                            {!response.data && "Hey! I am your personal A.I. assistant, Scrum. Use the panel on the left to tell me what to do, and I'll respond here!"}
                                        </div>
                                }
                            </Card>
                            {!!response.data &&
                                <div className="flex justify-end space-x-2">
                                    <div>
                                        {/* <Button size="3" variant="outline" color="pink">Saved <HeartIcon size="16" className="px-0 p-0" /></Button> */}
                                        <Button size="2" variant="outline">Save</Button>
                                    </div>
                                    <div>
                                        <Button size="2" variant="outline">Copy</Button>
                                    </div>
                                    <div>
                                        <Button size="2" variant="soft" color="gray">View JSON</Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
